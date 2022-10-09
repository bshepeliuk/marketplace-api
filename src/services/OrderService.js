import OrdersRepository from '../repositories/OrderRepository';
import createOption from '../utils/createOption';
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
  async getAvailableYearOptions({ userId }) {
    const devices = await OrdersRepository.findOrdersByUserId({ userId });
    const deviceIds = devices.map((item) => item.id);

    const where = {
      Device: { id: deviceIds },
    };

    const dates = await OrdersRepository.getAvailableYears(where);

    return dates.map((item) => {
      return createOption(new Date(item.fullDate).getFullYear());
    });
  },
};

export default OrderService;
