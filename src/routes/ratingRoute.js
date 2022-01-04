import * as RatingController from '../controllers/RatingController';

const addRatingOptions = {
  handler: RatingController.add,
};

const ratingRoutes = async (fastify) => {
  fastify.post('/api/rating', addRatingOptions);
};

export default ratingRoutes;
