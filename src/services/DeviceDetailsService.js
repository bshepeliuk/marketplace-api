import models from '../database';

const DeviceDetailsService = {
  findAll({ typeId }) {
    const where = {};

    if (typeId) where.typeId = typeId;

    return models.DeviceInfo.findAll({ where });
  },
};

export default DeviceDetailsService;
