import RatingService from '../services/RatingService';

export const add = async (req, res) => {
  const { rate, userId, deviceId } = req.body;

  const type = await RatingService.create({ rate, userId, deviceId });

  res.status(200).send({ type });
};
