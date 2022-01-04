import models from '../database';

export const add = async (req, res) => {
  const { name } = req.body;

  const brand = await models.Brand.create({ name });

  res.status(200).send({ brand });
};

export const getAll = async (req, res) => {
  const brands = await models.Brand.findAll();

  res.status(200).send({ brands });
};
