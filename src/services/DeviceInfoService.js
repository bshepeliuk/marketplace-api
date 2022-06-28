import models from '../database';
import sequelize, { Op } from 'sequelize';
import splitObjOnKeysAndValuesTuple from '../utils/splitObjOnKeysAndValuesTuple';

const DeviceInfoService = {
  findAll({ typeId }) {
    const where = {};

    if (typeId) where.typeId = typeId;

    return models.DeviceInfo.findAll({ where });
  },
  getDeviceIdsByFeatures(features) {
    const [keys, values] = splitObjOnKeysAndValuesTuple(features);
    const countOfOptions = [...new Set(keys)].length;

    return models.DeviceInfo.findAll({
      attributes: ['deviceId'],
      group: ['deviceId'],
      having: sequelize.where(
        sequelize.fn('COUNT', sequelize.col('deviceId')),
        {
          [Op.eq]: countOfOptions,
        }
      ),
      where: values ? { [Op.or]: [{ description: values }] } : undefined,
    }).then((details) => details.map((item) => item.deviceId));
  },
  create({ title, typeId, description, deviceId }) {
    return models.DeviceInfo.create({
      deviceId,
      title,
      description,
      typeId,
    });
  },
};

export default DeviceInfoService;
