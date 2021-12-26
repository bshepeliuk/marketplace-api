import 'dotenv/config';
import fastify from 'fastify';
import FormBody from 'fastify-formbody';
import Swagger from 'fastify-swagger';

import startServer from './app';
import { FASTIFY_OPTIONS, SWAGGER_OPTIONS } from './options';
import connectToPostgreSQL from './plugins/connectToPostgreSQL';
import setupRedisSession from './plugins/setupRedisSession';
import checkRoutes from './routes/check';

const app = fastify(FASTIFY_OPTIONS);

app.register(FormBody);
app.register(setupRedisSession);
app.register(connectToPostgreSQL);
app.register(Swagger, SWAGGER_OPTIONS);
// routes
app.register(checkRoutes);

startServer(app);
