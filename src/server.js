import 'dotenv/config';

import fastify from 'fastify';
import FormBody from 'fastify-formbody';
import FormBody from 'fastify-formbody';

import startServer from './app';
import { FASTIFY_OPTIONS, SWAGGER_OPTIONS } from './options';
import connectToPostgreSQL from './plugins/connectToPostgreSQL';
import setupRedisSession from './plugins/setupRedisSession';

const app = fastify(FASTIFY_OPTIONS);

app.register(FormBody);
app.register(setupRedisSession);
app.register(connectToPostgreSQL);
app.register(Swagger, SWAGGER_OPTIONS);

startServer(app);
