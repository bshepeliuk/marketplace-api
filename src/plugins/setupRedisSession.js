import FastifySession from '@fastify/session';
import FastifyCookie from 'fastify-cookie';
import fp from 'fastify-plugin';

import getRedisClientAndStorage from '../utils/getRedisClientAndStorage';
import getRedisSessionOptions from '../utils/getRedisSessionOptions';
import listenToRedisConnection from '../utils/listenToRedisConnection';

export const redisInstance = getRedisClientAndStorage();
const sessionOptions = getRedisSessionOptions(redisInstance);

listenToRedisConnection(redisInstance);

async function setupRedisSession(fastify, options = {}) {
  fastify.register(FastifyCookie);
  fastify.register(FastifySession, sessionOptions);
}

export default fp(setupRedisSession);
