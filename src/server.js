import 'dotenv/config';
import buildApp from './app';
import { FASTIFY_OPTIONS } from './options';
import startServer from './utils/startServer';

const app = buildApp(FASTIFY_OPTIONS);

startServer(app);
