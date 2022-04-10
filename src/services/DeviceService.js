import sequelize, { Op } from 'sequelize';
import models from '../database';

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
  findAll({ limit = 20, offset = 0, typeId, filterOptions, minMaxPrices }) {
    let where = {};
    let whereInfo = {};

    if (typeId) where.typeId = typeId;
    // TODO: refactoring;
    if (filterOptions?.length > 0) {
      whereInfo = { [Op.and]: [{ description: filterOptions }] };
    }

    if (minMaxPrices?.length > 0) {
      where = {
        ...where,
        price: {
          [Op.between]: [+minMaxPrices[0], +minMaxPrices[1]],
        },
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
          where: filterOptions?.length > 0 ? whereInfo : undefined, // TODO: refactoring;
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
