import * as RatingController from '../controllers/RatingController';
import * as validation from '../validations/RatingSchema';

const addRatingOptions = {
  handler: RatingController.add,
  schema: validation.addRatingForDeviceSchema,
};

const ratingRoutes = async (fastify) => {
  fastify.post('/api/ratings', addRatingOptions);
};

export default ratingRoutes;
