import sequelize, { Op } from 'sequelize';
import models from '../database';
import DeviceInfoService from './DeviceInfoService';

const DeviceService = {
  create({ name, price, brandId, typeId, quantity, userId }) {
    return models.Device.create({
      name,
      price,
      brandId,
      typeId,
      quantity,
      userId,
    });
  },
  async findAll({
    limit = 20,
    offset = 0,
    typeId,
    filters: { features, minPrice, maxPrice },
  }) {
    const where = {};

    const deviceIds = await DeviceInfoService.getDeviceIdsByFeatures(features);
    // prettier-ignore
    const hasNoDeviceByFeatures = features?.length > 0 && deviceIds.length === 0;

    if (hasNoDeviceByFeatures) return [];

    if (deviceIds.length > 0) where.id = deviceIds;

    if (typeId) where.typeId = typeId;

    if (minPrice && maxPrice) {
      where.price = {
        [Op.between]: [+minPrice, +maxPrice],
      };
    }

    return models.Device.findAndCountAll({
      offset,
      limit,
      where,
      order: [['id', 'ASC']], // TODO: temp, ony for client tests
      include: [
        {
          model: models.DeviceInfo,
          as: 'info',
        },

        {
          model: models.Rating,
          as: 'ratings',
        },
        {
          model: models.DeviceImage,
          as: 'images',
        },
      ],
    });
  },
  findOneById(deviceId) {
    return models.Device.findOne({
      where: { id: deviceId },
      include: [
        {
          model: models.DeviceInfo,
          as: 'info',
        },
        {
          model: models.Rating,
          as: 'ratings',
        },
        {
          model: models.DeviceImage,
          as: 'images',
        },
      ],
    });
  },
  async getMaxAndMinPricesByTypeId(typeId) {
    if (!typeId) return null;

    const prices = await models.Device.findAll({
      where: { typeId },
      attributes: [
        [sequelize.fn('min', sequelize.col('price')), 'min'],
        [sequelize.fn('max', sequelize.col('price')), 'max'],
      ],
    });

    return prices[0];
  },

  destroyById(deviceId) {
    return models.Device.destroy({ where: { id: deviceId } });
  },
};

export default DeviceService;
