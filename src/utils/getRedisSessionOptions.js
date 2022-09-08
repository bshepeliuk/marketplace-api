import { isItProductionMode } from './checkEnvMode';

function getRedisSessionOptions(RedisInstance) {
  const SESSION_TTL = 24 * 60 * 60 * 1000;

  const sessionOptions = {
    store: new RedisInstance.storage({
      client: RedisInstance.client,
      ttl: SESSION_TTL,
    }),
    cookieName: process.env.COOKIE_SESSION_NAME,
    secret: process.env.SESSION_SECRET_KEY,
    saveUninitialized: false,
    cookie: {
      path: '/',
      maxAge: SESSION_TTL,
      sameSite: isItProductionMode ? 'none' : 'lax',
      secure: isItProductionMode,
      httpOnly: true,
    },
  };

  return sessionOptions;
}

export default getRedisSessionOptions;
