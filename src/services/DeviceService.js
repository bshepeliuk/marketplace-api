import sequelize, { Op } from 'sequelize';
import DeviceRepository from '../repositories/DeviceRepository';
import DeviceInfoService from './DeviceInfoService';

const DeviceService = {
  create({ name, price, brandId, typeId, quantity, userId }) {
    return DeviceRepository.create({
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
    filters: { features, minPrice, maxPrice, name },
  }) {
    const where = {};

    const deviceIds = await DeviceInfoService.getDeviceIdsByFeatures(features);
    // prettier-ignore
    const hasNoDeviceByFeatures = features?.length > 0 && deviceIds.length === 0;

    if (hasNoDeviceByFeatures) return [];

    if (deviceIds.length > 0) {
      where.id = deviceIds;
    }

    if (typeId) where.typeId = typeId;

    if (minPrice && maxPrice) {
      where.price = {
        [Op.between]: [+minPrice, +maxPrice],
      };
    }

    if (minPrice && maxPrice) {
      where.price = {
        [Op.between]: [+minPrice, +maxPrice],
      };
    }

    if (name !== undefined) {
      where.name = sequelize.where(
        sequelize.fn('LOWER', sequelize.col('name')),
        'LIKE',
        `%${name.toLowerCase()}%`
      );
    }

    return DeviceRepository.findAll({ offset, limit, where });
  },
  findOneById(deviceId) {
    return DeviceRepository.findOneById(deviceId);
  },
  async getMaxAndMinPricesByTypeId(typeId) {
    if (!typeId) return null;
    return DeviceRepository.getMaxAndMinPricesByTypeId(typeId);
  },

  destroyById(deviceId) {
    return DeviceRepository.destroyById(deviceId);
  },
};

export default DeviceService;
