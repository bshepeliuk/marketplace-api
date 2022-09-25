import models from '../database';

const PurchaseService = {
  findAllByUserId({ userId }) {
    return models.Order.findAll({
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
            as: 'order',
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
