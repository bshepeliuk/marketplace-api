import FastifySession from '@fastify/session';
import redis from 'redis';
import RedisStore from 'connect-redis';

function getRedisClientAndStorage() {
  const storage = RedisStore(FastifySession);
  const client = redis.createClient({
    host: process.env.REDIS_HOSTNAME || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
  });

  return {
    storage,
    client,
  };
}

export default getRedisClientAndStorage;
