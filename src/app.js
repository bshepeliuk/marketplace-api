import fastify from 'fastify';
import FormBody from 'fastify-formbody';
import Swagger from 'fastify-swagger';
import FastifyCors from 'fastify-cors';
import fastifyMultipart from '@fastify/multipart';
import connectToPostgreSQL from './plugins/connectToPostgreSQL';
import setupRedisSession from './plugins/setupRedisSession';
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
import filtersRoute from './routes/filtersRoute';
import stripePaymentRoute from './routes/stripePaymentRoute';
import commentRoutes from './routes/commentsRoute';
import orderRoutes from './routes/orderRoute';
import purchaseRoutes from './routes/purchaseRoute';
import statsRoutes from './routes/statsRoute';

function buildApp(opts = {}) {
  const app = fastify(opts);

  app.register(FormBody);
  app.register(setupRedisSession);
  app.register(connectToPostgreSQL);
  app.register(Swagger, SWAGGER_OPTIONS);
  app.register(fastifyMultipart, { attachFieldsToBody: true });
  app.register(FastifyCors, { origin: true, credentials: true });
  // routes
  app.register(authRoutes);
  app.register(userRoutes);
  app.register(typeRoutes);
  app.register(brandRoutes);
  app.register(deviceRoutes);
  app.register(ratingRoutes);
  app.register(cartRoutes);
  app.register(deviceImageRoutes);
  app.register(filtersRoute);
  app.register(stripePaymentRoute);
  app.register(commentRoutes);
  app.register(orderRoutes);
  app.register(purchaseRoutes);
  app.register(statsRoutes);

  app.setErrorHandler(errorHandler);

  return app;
}

export default buildApp;
