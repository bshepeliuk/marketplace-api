import 'dotenv/config';
import buildApp from '../../src/app';
import { redisInstance } from '../../src/plugins/setupRedisSession';
import UserService from '../../src/services/UserService';
import { fakeRequest } from '../test-helpers/fakeRequest';

describe('Auth API', () => {
  let app;

  beforeAll(() => {
    app = buildApp();
    fakeRequest.init(app);
  });

  afterAll(async () => {
    await app.close();
    await UserService.removeAllUsers();
    // TODO: create helper for redis instance
    redisInstance.client.flushall();
    redisInstance.client.quit();

    app = null;
  });

  describe('register', () => {
    test('when user credentials for register is empty.', async () => {
      const res = await fakeRequest.register();

      expect(res.statusCode).toBe(400);
    });

    test('when user does not fill required field -> EMAIL', async () => {
      const res = await fakeRequest.register({
        fullName: 'Tony Stark',
        role: 'BUYER',
        password: '1111',
      });

      expect(res.statusCode).toBe(400);
    });

    test('when user does not fill required field -> PASSWORD', async () => {
      const res = await fakeRequest.register({
        email: 'tony@stark.io',
        fullName: 'Tony Stark',
        role: 'BUYER',
      });

      expect(res.statusCode).toBe(400);
    });

    test('when user does not fill required field -> ROLE', async () => {
      const res = await fakeRequest.register({
        email: 'tony@stark.io',
        fullName: 'Tony Stark',
        password: '1111',
      });

      expect(res.statusCode).toBe(400);
    });

    test('when user does not fill required field -> FULL NAME', async () => {
      const res = await fakeRequest.register({
        email: 'tony@stark.io',
        role: 'BUYER',
        password: '1111',
      });

      expect(res.statusCode).toBe(400);
    });

    test('when user pass incorrect role. BUYER and SELLER allowed', async () => {
      const res = await fakeRequest.register({
        email: 'tony@stark.io',
        fullName: 'Tony Stark',
        role: 'INCORRECT_ROLE',
        password: '1111',
      });

      expect(res.statusCode).toBe(400);
    });

    test('when all registration fields is correct', async () => {
      const res = await fakeRequest.register({
        email: 'tony@stark.io',
        fullName: 'Tony Stark',
        role: 'BUYER',
        password: '1111',
      });

      expect(res.statusCode).toBe(200);
    });

    test('when user with the same EMAIL already exists', async () => {
      const res = await fakeRequest.register({
        email: 'tony@stark.io',
        fullName: 'Tony Stark',
        role: 'BUYER',
        password: '1111',
      });

      expect(res.statusCode).toBe(409);
    });
  });

  describe('login', () => {
    test('when credentials for login is empty.', async () => {
      const res = await fakeRequest.login();

      expect(res.statusCode).toBe(400);
    });

    test('when user with current credentials is not exists.', async () => {
      const res = await fakeRequest.login({
        email: 'tony@stark.io',
        password: 'incorrect_password',
      });

      expect(res.statusCode).toBe(400);
    });

    test('when user does not pass required field -> PASSWORD', async () => {
      const res = await fakeRequest.login({
        email: 'tony@stark.io',
      });

      expect(res.statusCode).toBe(400);
    });

    test('when user does not pass required field -> EMAIL', async () => {
      const res = await fakeRequest.login({
        password: 'incorrect_password',
      });

      expect(res.statusCode).toBe(400);
    });

    test('login with correct credentials.', async () => {
      const res = await fakeRequest.login({
        email: 'tony@stark.io',
        password: '1111',
      });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('logout', () => {
    test('when unauthorized user try to logout.', async () => {
      const res = await fakeRequest.logout();

      expect(res.statusCode).toBe(401);
    });

    test('when authorized user try to logout.', async () => {
      const loggedInUser = await fakeRequest.login({
        email: 'tony@stark.io',
        password: '1111',
      });
      const cookie = loggedInUser.headers['set-cookie'];
      const res = await fakeRequest.logout(cookie);

      expect(res.statusCode).toBe(200);
    });
  });
});
