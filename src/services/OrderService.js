import { Op } from 'sequelize';
import { ORDER_STATUS } from '../constants';
import models from '../database';

const OrderService = {
  async createOrderByStripeSession({ orders, session }) {
    const order = await models.Order.create({
      userId: Number(orders[0].customerId),
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
            as: 'orderDevice',
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

  async findAll({ userId, limit = 20, offset = 0 }) {
    const devices = await this.findAllByUserId({ userId });
    const deviceIds = devices.map((item) => item.id);

    return models.Order.findAndCountAll({
      limit,
      offset,
      distinct: true,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: models.Device,
          as: 'devices',
          where: {
            id: deviceIds,
          },
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

  changeOrderStatus({ id, status }) {
    return models.OrderDevice.update({ status }, { where: { id } });
  },
};

export default OrderService;
