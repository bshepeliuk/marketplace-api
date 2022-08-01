import CommentRepository from '../repositories/CommentRepository';

const CommentsService = {
  create({ parentId = null, body, fullName, deviceId }) {
    return CommentRepository.create({ body, fullName, parentId, deviceId });
  },
  findAllByDeviceId({ deviceId, offset, limit }) {
    return CommentRepository.getWithRepliesCountByDeviceId({
      deviceId,
      offset,
      limit,
    });
  },
  updateById({ commentId, body }) {
    return CommentRepository.updateById({ commentId, body });
  },
  deleteById(commentId) {
    return CommentRepository.destroyById(commentId);
  },
  findRepliesByCommentId({ commentId, offset, limit }) {
    return CommentRepository.findRepliesByCommentId({
      commentId,
      offset,
      limit,
    });
  },
};

export default CommentsService;
