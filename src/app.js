import fastify from 'fastify';
import FormBody from 'fastify-formbody';
import Swagger from 'fastify-swagger';

import { SWAGGER_OPTIONS } from './options';
import connectToPostgreSQL from './plugins/connectToPostgreSQL';
import setupRedisSession from './plugins/setupRedisSession';
import authGate from './utils/authGate';
// routes
import authRoutes from './routes/auth';
import checkRoutes from './routes/check';
import userRoutes from './routes/user';

function build(opts = {}) {
  const app = fastify(opts);
  // plugins
  app.register(FormBody);
  app.register(setupRedisSession);
  app.register(connectToPostgreSQL);
  app.register(Swagger, SWAGGER_OPTIONS);
  // hooks
  app.addHook('preHandler', authGate);
  // routes
  app.register(checkRoutes);
  app.register(authRoutes);
  app.register(userRoutes);

  return app;
}

export default build;
