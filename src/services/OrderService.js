import { Op } from 'sequelize';
import { ORDER_STATUS } from '../constants';
import models from '../database';

const OrderService = {
  async createOrderByStripeSession({ orders, session }) {
    // TODO: add shipping address to Order table.
    const order = await models.Order.create({
      userId: Number(orders[0].customerId),
      status: ORDER_STATUS.paid,
      fullName: session.customer_details.name,
      phone: session.customer_details.phone,
    });

    orders.map((item) => {
      return models.OrderDevice.create({
        orderId: order.id,
        deviceId: Number(item.deviceId),
        quantity: item.quantity,
        status: ORDER_STATUS.paid,
      });
    });

    return order;
  },

  findAllByUserId({ userId }) {
    return models.Device.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: models.Order,
          as: 'orders',
          through: {
            model: models.OrderDevice,
          },
          where: {
            id: {
              [Op.ne]: null,
            },
          },
        },
      ],
    });
  },
};

export default OrderService;
