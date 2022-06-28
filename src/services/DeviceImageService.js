import models from '../database';

const DeviceImageService = {
  create({ deviceId, url }) {
    return models.DeviceImage.create({
      deviceId,
      url,
    });
  },
};

export default DeviceImageService;
