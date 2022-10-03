import sequelize, { Op } from 'sequelize';
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

  async findAll({
    userId,
    limit = 20,
    offset = 0,
    filters,
    sortDirection,
    sortField,
  }) {
    const devices = await this.findAllByUserId({ userId });
    const deviceIds = devices.map((item) => item.id);

    let where = {};
    const orderDeviceWhere = {};

    let sorting =
      sortField === undefined
        ? [['createdAt', 'DESC']]
        : [[sortField, sortDirection ?? 'DESC']];

    if (filters.status !== undefined) {
      orderDeviceWhere.status = {
        [Op.or]: Array.isArray(filters.status)
          ? filters.status
          : [filters.status],
      };
    }

    if (filters.order !== undefined) {
      const entries = Object.entries(filters.order).map(([key, value]) => {
        if (key === 'id') return [key, value];

        return [
          key,
          sequelize.where(
            sequelize.fn('LOWER', sequelize.col(`Order.${key}`)),
            'LIKE',
            `%${value.toLowerCase()}%`
          ),
        ];
      });

      where = Object.fromEntries(entries);
    }

    // TODO: create OrderRepository
    return models.Order.findAndCountAll({
      limit,
      offset,
      where,
      distinct: true,
      order: sorting,
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
            where: orderDeviceWhere,
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
