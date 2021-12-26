import FastifySession from '@fastify/session';
import redis from 'redis';
import RedisStore from 'connect-redis';

function getRedisClientAndStorage() {
  const storage = RedisStore(FastifySession);
  const client = redis.createClient();

  return {
    storage,
    client,
  };
}

export default getRedisClientAndStorage;
