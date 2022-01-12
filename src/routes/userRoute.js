import * as UserController from '../controllers/UserController';
import * as validation from '../validations/UserSchema';

const getUserOptions = {
  schema: validation.UserAccountSchema,
  handler: UserController.getAccountInfo,
};

const userRoutes = async (fastify) => {
  fastify.get('/api/user', getUserOptions);
};

export default userRoutes;
