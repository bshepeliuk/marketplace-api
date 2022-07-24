import models from '../database';

const CommentsService = {
  create({ parentId = null, body, fullName, deviceId }) {
    return models.Comments.create({ body, fullName, parentId, deviceId });
  },
  findAllByDeviceId(deviceId) {
    return models.Comments.findAll({ where: { deviceId } });
  },
  updateById({ commentId, body }) {
    return models.Comments.update(
      { body },
      {
        where: { id: commentId },
        returning: true,
        plain: true,
      }
    );
  },
  deleteById(commentId) {
    return models.Comments.destroy({ where: { id: commentId } });
  },
};

export default CommentsService;
