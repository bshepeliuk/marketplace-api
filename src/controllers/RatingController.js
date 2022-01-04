import models from '../database';

export const add = async (req, res) => {
  const { rate, userId, deviceId } = req.body;

  const type = await models.Rating.create({ rate, userId, deviceId });

  res.status(200).send({ type });
};
