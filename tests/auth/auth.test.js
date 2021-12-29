import 'dotenv/config';
import build from '../../src/app';
import models from '../../src/database';
import { FASTIFY_OPTIONS } from '../../src/options';
import { redisInstance } from '../../src/plugins/setupRedisSession';

describe('Authorization', () => {
  let app;

  beforeAll(() => {
    app = build(FASTIFY_OPTIONS);
  });

  afterAll(async () => {
    await app.close();
    await redisInstance.client.quit(); // TODO: create helper for redis instance
    await models.User.destroy({ where: {} });
  });

  describe('register', () => {
    test('when credentials for register is empty.', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/auth/register',
      });

      expect(res.statusCode).toBe(400);
    });

    test('when all registration fields is correct', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/auth/register',
        payload: {
          email: 'tony@stark.io',
          fullName: 'Tony Stark',
          role: 'BUYER',
          password: '1111',
        },
      });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('login', () => {
    test('when credentials for login is empty.', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/auth/login',
      });

      expect(res.statusCode).toBe(400);
    });

    test('when user with current credentials is not exists.', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/auth/login',
        payload: {
          email: 'tony@stark.io',
          password: 'incorrect_password',
        },
      });

      expect(res.statusCode).toBe(400);
    });

    test('login with correct credentials.', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/auth/login',
        payload: {
          email: 'tony@stark.io',
          password: '1111',
        },
      });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('logout', () => {
    test('when unauthorized user try to logout.', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/auth/logout',
      });

      expect(res.statusCode).toBe(401);
    });

    test('when authorized user try to logout.', async () => {
      const loggedInUser = await app.inject({
        method: 'POST',
        url: '/api/auth/login',
        payload: {
          email: 'tony@stark.io',
          password: '1111',
        },
      });

      const res = await app.inject({
        method: 'POST',
        url: '/api/auth/logout',
        headers: {
          Cookie: loggedInUser.headers['set-cookie'],
        },
      });

      expect(res.statusCode).toBe(200);
    });
  });
});
