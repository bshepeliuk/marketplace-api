import * as RatingController from '../controllers/RatingController';
import * as validation from '../validations/RatingSchema';
import authGate from '../middlewares/authGate';

const addRatingOptions = {
  handler: RatingController.add,
  schema: validation.addRatingForDeviceSchema,
  preHandler: authGate,
};

const ratingRoutes = async (fastify) => {
  fastify.post('/api/ratings', addRatingOptions);
};

export default ratingRoutes;
