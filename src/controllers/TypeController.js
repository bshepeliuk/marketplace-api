import models from '../database';
import TypeService from '../services/TypeService';

export const add = async (req, res) => {
  const { name } = req.body;

  const type = await TypeService.create({ name });

  res.status(200).send({ type });
};

export const getAll = async (req, res) => {
  const types = await models.Type.findAll();

  res.status(200).send({ types });
};
