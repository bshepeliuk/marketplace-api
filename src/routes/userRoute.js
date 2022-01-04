import * as UserController from '../controllers/UserController';

const getUserOptions = {
  handler: UserController.getAccountInfo,
};

const userRoutes = async (fastify) => {
  fastify.get('/api/user', getUserOptions);
};

export default userRoutes;
