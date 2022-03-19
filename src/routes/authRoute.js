import * as AuthController from '../controllers/AuthController';
import * as AuthSchema from '../validations/AuthSchema';
import authGate from '../middlewares/authGate';

const loginOptions = {
  schema: AuthSchema.LoginSchema,
  handler: AuthController.login,
};

const registerOptions = {
  schema: AuthSchema.RegisterSchema,
  handler: AuthController.register,
};

const logoutOptions = {
  schema: AuthSchema.LogoutSchema,
  handler: AuthController.logout,
  preHandler: authGate,
};

const authRoutes = async (fastify) => {
  fastify.post('/api/auth/login', loginOptions);
  fastify.post('/api/auth/register', registerOptions);
  fastify.post('/api/auth/logout', logoutOptions);
};

export default authRoutes;
