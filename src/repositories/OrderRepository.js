import sequelize, { Op } from 'sequelize';
import { ORDER_STATUS } from '../constants';
import models from '../database';

const OrdersRepository = {
  async create({ customer, orders }) {
    const order = await models.Order.create({
      userId: customer.userId,
      fullName: customer.fullName,
      phone: customer.phone,
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

  findOrdersByUserId({ userId }) {
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

  findAndCountAll({ where, limit, offset, sorting }) {
    const hasLimitKey = limit !== undefined;
    const hasOffsetKey = offset !== undefined;

    return models.Order.findAndCountAll({
      ...(hasLimitKey && { limit }),
      ...(hasOffsetKey && { offset }),
      order: sorting.Order,
      where: where.Order,
      distinct: true,
      include: [
        {
          model: models.Device,
          as: 'devices',
          where: where.Device,
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
            where: where.OrderDevice,
          },
        },
        {
          model: models.ShippingAddress,
          as: 'address',
        },
      ],
    });
  },
  changeStatusByOrderItemId({ id, status }) {
    return models.OrderDevice.update({ status }, { where: { id } });
  },
  getAvailableYears(where) {
    return models.Order.findAll({
      where: where.Order,
      attributes: [
        [
          sequelize.fn('date_trunc', 'year', sequelize.col('Order.createdAt')),
          'fullDate',
        ],
      ],
      include: [
        {
          model: models.Device,
          as: 'devices',
          where: where.Device,
          attributes: [],
          through: {
            model: models.OrderDevice,
            as: 'orderDevice',
            attributes: [],
          },
        },
      ],
      raw: true,
      group: ['fullDate'],
    });
  },
};

export default OrdersRepository;
