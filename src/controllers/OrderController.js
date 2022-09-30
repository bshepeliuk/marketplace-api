import OrderService from '../services/OrderService';

export const create = async (req, res) => {
  const { userId, status } = req.body;

  const order = await OrderService.create({ userId, status });

  res.status(200).send({ order });
};

export const getAll = async (req, res) => {
  const { offset, limit } = req.query;
  const { userId } = req.session.current;

  const { count, rows } = await OrderService.findAll({ userId, offset, limit });

  res.status(200).send({ total: count, orders: rows });
};

export const changeOrderStatus = async (req, res) => {
  const { id, status } = req.body;

  const orders = await OrderService.changeOrderStatus({ id, status });

  res.status(200).send({ orders });
};
