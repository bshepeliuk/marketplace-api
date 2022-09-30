import models from '../database';

const PurchaseService = {
  findAllByUserId({ userId, limit = 20, offset = 0 }) {
    return models.Order.findAndCountAll({
      limit,
      offset,
      distinct: true,
      order: [['updatedAt', 'DESC']],
      where: {
        userId,
      },
      include: [
        {
          model: models.Device,
          as: 'devices',
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
          through: {
            model: models.OrderDevice,
            as: 'orderDevice',
          },
        },
        {
          model: models.ShippingAddress,
          as: 'address',
        },
      ],
    });
  },
};

export default PurchaseService;
