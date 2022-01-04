import models from '../database';

export const create = async (req, res) => {
  const { userId } = req.session.current;
  const cart = await models.Cart.create({ userId });

  res.status(200).send({ cart });
};

export const get = async (req, res) => {
  const { userId } = req.session.current;
  const cart = await models.Cart.findOne({ where: { userId } });

  res.status(200).send({ cart });
};
