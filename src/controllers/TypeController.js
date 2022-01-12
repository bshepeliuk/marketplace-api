import TypeService from '../services/TypeService';

export const add = async (req, res) => {
  const { name } = req.body;

  const type = await TypeService.create({ name });

  res.status(200).send({ type });
};

export const getAll = async (req, res) => {
  const types = await TypeService.findAll();

  res.status(200).send({ types });
};

export const deleteById = async (req, res) => {
  const { typeId } = req.params;

  await TypeService.destroyById(typeId);

  res.status(200).send({ message: 'Type deleted successfully!!!' });
};
