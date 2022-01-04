import models from '../database';

export const add = async (req, res) => {
  const { name } = req.body;

  const type = await models.Type.create({ name });

  res.status(200).send({ type });
};

export const getAll = async (req, res) => {
  const types = await models.Type.findAll();

  res.status(200).send({ types });
};
