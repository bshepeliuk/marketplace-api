import { isItProductionMode } from './checkEnvMode';

function getRedisSessionOptions(redisInstance) {
  const REDIS_HOST_DEV = '127.0.0'; // TODO: move to .env
  const REDIS_PORT_DEV = 6379; // TODO: move to .env
  const SESSION_TTL = 24 * 60 * 60 * 1000; // 1d
  const COOKIE_SESSION_NAME = 'sessionId'; // TODO: move to .env

  const sessionOptions = {
    store: new redisInstance.storage({
      client: redisInstance.client,
      host: REDIS_HOST_DEV,
      port: REDIS_PORT_DEV,
      ttl: SESSION_TTL,
    }),
    cookieName: COOKIE_SESSION_NAME,
    secret: process.env.SESSION_SECRET_KEY,
    saveUninitialized: false,
    cookie: {
      path: '/',
      sameSite: isItProductionMode ? 'none' : 'lax',
      secure: isItProductionMode,
      httpOnly: true,
      expires: new Date(new Date().getTime() + SESSION_TTL),
    },
  };

  return sessionOptions;
}

export default getRedisSessionOptions;
