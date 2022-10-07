import OrdersRepository from '../repositories/OrderRepository';
import createOrderWhereClauses from '../utils/createOrderWhereClauses';

const PurchaseService = {
  findAllByUserId({
    userId,
    limit = 20,
    offset = 0,
    filters,
    sortDirection,
    sortField,
  }) {
    const hasSortField = sortField !== undefined;

    const where = createOrderWhereClauses({
      userId,
      status: filters.status,
      order: filters.order,
      deviceName: filters.deviceName,
    });

    const sorting = hasSortField
      ? [[sortField, sortDirection ?? 'DESC']]
      : [['updatedAt', 'DESC']];

    return OrdersRepository.findAndCountAll({
      limit,
      offset,
      sorting: { Order: sorting },
      where: {
        Order: where.Order,
        Device: where.Device,
        OrderDevice: where.OrderDevice,
      },
    });
  },
};

export default PurchaseService;
