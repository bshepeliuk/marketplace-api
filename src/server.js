import 'dotenv/config';
import build from './app';
import { FASTIFY_OPTIONS } from './options';
import startServer from './utils/startServer';

const app = build(FASTIFY_OPTIONS);

startServer(app);
