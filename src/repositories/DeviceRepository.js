import sequelize from 'sequelize';
import models from '../database';

const DeviceRepository = {
  relations: [
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
  async findOneById(deviceId) {
    return models.Device.findOne({
      where: { id: deviceId },
      include: this.relations,
    });
  },
  async getMaxAndMinPricesByTypeId(typeId) {
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
  findAll({ offset, limit, where }) {
    return models.Device.findAndCountAll({
      offset,
      limit,
      where,
      distinct: true,
      order: [['id', 'ASC']], // TODO: temp, ony for client tests
      include: this.relations,
    });
  },
};

export default DeviceRepository;
