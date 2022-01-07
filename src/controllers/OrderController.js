import models from '../database';

export const createOrder = async (req, res) => {
  const { userId, status = 'PENDING' } = req.body;

  const order = await models.Order.create({ userId, status });
  const item = await models.OrderItem.create({ userId, orderId: order.id });

  res.status(200).send({ item });
};

export const getAllOrders = async (req, res) => {
  const orders = await models.OrderItem.findAll();

  res.status(200).send({ orders });
};
