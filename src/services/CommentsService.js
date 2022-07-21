import models from '../database';

const CommentsService = {
  create({ parentId = null, body, fullName, deviceId }) {
    return models.Comments.create({ body, fullName, parentId, deviceId });
  },
  findAllByDeviceId(deviceId) {
    return models.Comments.findAll({ where: { deviceId } });
  },
};

export default CommentsService;
