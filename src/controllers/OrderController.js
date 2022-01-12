import OrderService from '../services/OrderService';

export const createOrder = async (req, res) => {
  const { userId, status = 'PENDING' } = req.body;

  const order = await OrderService.create({ userId, status });

  res.status(200).send({ order });
};

export const getAllOrders = async (req, res) => {
  const orders = await OrderService.findAll();

  res.status(200).send({ orders });
};
