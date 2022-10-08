import sequelize from 'sequelize';
import models from '../database';
import OrdersRepository from '../repositories/OrderRepository';
import createOrderWhereClauses from '../utils/createOrderWhereClauses';

const OrderService = {
  createOrderByStripeSession({ orders, session }) {
    const customer = {
      userId: Number(orders[0].customerId),
      fullName: session.customer_details.name,
      phone: session.customer_details.phone,
    };

    return OrdersRepository.create({ orders, customer });
  },
  async findAll({
    userId,
    limit = 20,
    offset = 0,
    filters,
    sortDirection,
    sortField,
  }) {
    const hasSortField = sortField !== undefined;

    const devices = await OrdersRepository.findOrdersByUserId({ userId });
    const deviceIds = devices.map((item) => item.id);

    const where = createOrderWhereClauses({
      deviceIds,
      status: filters.status,
      order: filters.order,
      months: filters.months,
      year: filters.year,
    });

    const sorting = hasSortField
      ? [[sortField, sortDirection ?? 'DESC']]
      : [['createdAt', 'DESC']];

    return OrdersRepository.findAndCountAll({
      limit,
      offset,
      sorting: { Order: sorting },
      where: {
        Order: where.Order,
        OrderDevice: where.OrderDevice,
        Device: where.Device,
      },
    });
  },
  changeOrderStatus({ id, status }) {
    return OrdersRepository.changeStatusByOrderItemId({ id, status });
  },
  async getAvailableYearsOptions({ userId }) {
    // TODO: move to OrderRepository;
    const devices = await OrdersRepository.findOrdersByUserId({ userId });
    const deviceIds = devices.map((item) => item.id);

    const dates = await models.Order.findAll({
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
          where: { id: deviceIds },
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

    return dates.map((item) => ({
      label: new Date(item.fullDate).getFullYear(),
      value: new Date(item.fullDate).getFullYear(),
    }));
  },
};

export default OrderService;
