import CommentRepository from '../repositories/CommentRepository';

const CommentsService = {
  create({ parentId = null, body, fullName, deviceId }) {
    return CommentRepository.create({ body, fullName, parentId, deviceId });
  },
  findAllByDeviceId(deviceId) {
    return CommentRepository.getWithRepliesCountByDeviceId({ deviceId });
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
