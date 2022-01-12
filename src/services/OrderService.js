import models from '../database';

const OrderService = {
  async create({ status, userId }) {
    const order = await models.Order.create({ userId, status });

    return models.OrderItem.create({ userId, orderId: order.id });
  },

  findAll() {
    return models.OrderItem.findAll();
  },
};

export default OrderService;
