import CommentRepository from '../repositories/CommentRepository';

const CommentsService = {
  create({ parentId = null, body, fullName, deviceId }) {
    return CommentRepository.create({ body, fullName, parentId, deviceId });
  },
  findAllByDeviceId(deviceId) {
    return CommentRepository.findWithRepliesCountByDeviceId({ deviceId });
  },
  updateById({ commentId, body }) {
    return CommentRepository.updateById({ commentId, body });
  },
  deleteById(commentId) {
    return CommentRepository.destroyById(commentId);
  },
};

export default CommentsService;
