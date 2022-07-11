import RatingService from '../services/RatingService';

export const add = async (req, res) => {
  const { userId } = req.session.current;
  const { rating, deviceId } = req.body;

  const addedRating = await RatingService.create({
    userId,
    deviceId,
    rate: rating,
  });

  res.status(200).send({ rating: addedRating });
};
