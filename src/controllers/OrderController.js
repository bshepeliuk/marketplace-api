import OrderService from '../services/OrderService';

export const create = async (req, res) => {
  const { userId, status } = req.body;

  const order = await OrderService.create({ userId, status });

  res.status(200).send({ order });
};

export const getAll = async (req, res) => {
  const { userId } = req.session.current;

  const orders = await OrderService.findAllByUserId({ userId });

  res.status(200).send({ orders });
};
