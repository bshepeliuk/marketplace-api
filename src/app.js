import fastify from 'fastify';
import FormBody from 'fastify-formbody';
import Swagger from 'fastify-swagger';

import connectToPostgreSQL from './plugins/connectToPostgreSQL';
import setupRedisSession from './plugins/setupRedisSession';
import authGate from './middlewares/authGate';
import { SWAGGER_OPTIONS } from './config/options';
// routes
import authRoutes from './routes/auth';
import checkRoutes from './routes/check';
import userRoutes from './routes/user';
import errorHandler from './utils/errorHandler';

function buildApp(opts = {}) {
  const app = fastify(opts);

  app.register(FormBody);
  app.register(setupRedisSession);
  app.register(connectToPostgreSQL);
  app.register(Swagger, SWAGGER_OPTIONS);

  app.addHook('preHandler', authGate);
  // routes
  app.register(checkRoutes);
  app.register(authRoutes);
  app.register(userRoutes);

  app.setErrorHandler(errorHandler);

  return app;
}

export default buildApp;
