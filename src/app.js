import fastify from 'fastify';
import FormBody from 'fastify-formbody';
import Swagger from 'fastify-swagger';
import FastifyCors from 'fastify-cors';
import connectToPostgreSQL from './plugins/connectToPostgreSQL';
import setupRedisSession from './plugins/setupRedisSession';
import authGate from './middlewares/authGate';
import { SWAGGER_OPTIONS } from './config/options';
import errorHandler from './utils/errorHandler';
// routes
import authRoutes from './routes/authRoute';
import userRoutes from './routes/userRoute';
import typeRoutes from './routes/typeRoute';
import brandRoutes from './routes/brandRoute';
import deviceRoutes from './routes/deviceRoute';
import ratingRoutes from './routes/ratingRoute';
import cartRoutes from './routes/cartRoute';
import deviceImageRoutes from './routes/deviceImageRoute';

function buildApp(opts = {}) {
  const app = fastify(opts);

  app.register(FormBody);
  app.register(setupRedisSession);
  app.register(connectToPostgreSQL);
  app.register(Swagger, SWAGGER_OPTIONS);
  app.register(FastifyCors, { origin: true, credentials: true });

  app.addHook('preHandler', authGate);
  // routes
  app.register(authRoutes);
  app.register(userRoutes);
  app.register(typeRoutes);
  app.register(brandRoutes);
  app.register(deviceRoutes);
  app.register(ratingRoutes);
  app.register(cartRoutes);
  app.register(deviceImageRoutes);

  app.setErrorHandler(errorHandler);

  return app;
}

export default buildApp;
