import { Op } from 'sequelize';
import models from '../database';

const CommentRepository = {
  create({ body, fullName, parentId, deviceId }) {
    return models.Comments.create({ body, fullName, parentId, deviceId });
  },
  findByDeviceId({ deviceId }) {
    return models.Comments.findAll({
      where: { deviceId },
      order: [['createdAt', 'DESC']],
    });
  },
  updateById({ commentId, body }) {
    return models.Comments.update(
      { body },
      {
        where: { id: commentId },
        returning: true,
        plain: true,
      }
    ).then(([_, comment]) => comment);
  },
  destroyById(commentId) {
    return models.Comments.destroy({
      where: {
        [Op.or]: [{ id: commentId }, { parentId: commentId }],
      },
    });
  },
  findRepliesByCommentId({ commentId, limit = 20, offset = 0 }) {
    return models.Comments.findAll({
      limit,
      offset,
      where: { parentId: commentId },
      order: [['createdAt', 'ASC']],
    });
  },
  async getWithRepliesCountByDeviceId({ deviceId, limit = 20, offset = 0 }) {
    const comments = await models.Comments.findAll({
      limit,
      offset,
      where: { parentId: null, deviceId },
      nest: true,
      raw: true,
      order: [['createdAt', 'ASC']],
    });

    const commentWithRepliesCount = comments.map((comment) => {
      return models.Comments.findAndCountAll({
        where: { parentId: comment.id },
      }).then(({ count }) => ({
        ...comment,
        repliesCount: count,
      }));
    });

    return Promise.all(commentWithRepliesCount);
  },
};

export default CommentRepository;
