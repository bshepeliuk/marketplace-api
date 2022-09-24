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
          through: {
            model: models.OrderDevice,
            as: 'order',
          },
        },
      ],
    });
  },
};

export default PurchaseService;
