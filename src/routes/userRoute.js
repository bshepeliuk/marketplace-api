import * as UserController from '../controllers/UserController';
import * as validation from '../validations/UserSchema';
import authGate from '../middlewares/authGate';

const getUserOptions = {
  schema: validation.UserAccountSchema,
  handler: UserController.getAccountInfo,
  preHandler: authGate,
};

const userRoutes = async (fastify) => {
  fastify.get('/api/user', getUserOptions);
};

export default userRoutes;
