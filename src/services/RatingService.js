import models from '../database';

const RatingService = {
  create({ rate, userId, deviceId }) {
    return models.Rating.create({ rate, userId, deviceId });
  },
};

export default RatingService;
