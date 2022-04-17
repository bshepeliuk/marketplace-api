import sequelize, { Op } from 'sequelize';
import models from '../database';
import deserializeObject from '../utils/deserializeObject';

const DeviceService = {
  create({ name, price, brandId, typeId, quantity }) {
    return models.Device.create({
      name,
      price,
      brandId,
      typeId,
      quantity,
    });
  },
  async findAll({
    limit = 20,
    offset = 0,
    typeId,
    filters: { deviceOptions, minMaxPrices },
  }) {
    if (typeof deviceOptions === 'string') {
      deviceOptions = [deviceOptions];
    }

    const filters = deviceOptions?.map((item) => {
      return deserializeObject(item);
    });
    // TODO: refactoring;
    const [optionsKeys, or] = (filters || []).reduce((acc, current) => {
      const [key, value] = Object.entries(current).flat(1);
      return [(acc[0] || []).concat(key), (acc[1] || []).concat(value)];
    }, []);

    const countOfOptions = [...new Set(optionsKeys)].length;

    const info = await models.DeviceInfo.findAll({
      attributes: ['deviceId'],
      group: ['deviceId'],
      having: sequelize.where(
        sequelize.fn('COUNT', sequelize.col('deviceId')),
        {
          [Op.eq]: countOfOptions,
        }
      ),
      where: or ? { [Op.or]: [{ description: or }] } : undefined,
    });
    const ids = info.map((i) => i.deviceId);
    // TODO: refactoring;
    if (filters?.length > 0 && ids.length === 0) return [];

    let where = {};

    if (ids.length > 0) where.id = ids;
    if (typeId) where.typeId = typeId;
    if (minMaxPrices?.length > 0) {
      where.price = {
        [Op.between]: [+minMaxPrices[0], +minMaxPrices[1]],
      };
    }

    return models.Device.findAll({
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
