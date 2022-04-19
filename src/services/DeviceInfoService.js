import models from '../database';
import sequelize, { Op } from 'sequelize';
import splitObjOnKeysAndValuesTuple from '../utils/splitObjOnKeysAndValuesTuple';

const DeviceInfoService = {
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
};

export default DeviceInfoService;
