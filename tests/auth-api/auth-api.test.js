import 'dotenv/config';
import { fakeAuthRequest } from '../test-helpers/fakeRequest';

describe('Auth API', () => {
  describe('register', () => {
    test('when user credentials for register is empty.', async () => {
      const res = await fakeAuthRequest.register();

      expect(res.statusCode).toBe(400);
    });

    test('when user does not fill required field -> EMAIL', async () => {
      const res = await fakeAuthRequest.register({
        fullName: 'Tony Stark',
        role: 'BUYER',
        password: '1111',
      });

      expect(res.statusCode).toBe(400);
    });

    test('when user does not fill required field -> PASSWORD', async () => {
      const res = await fakeAuthRequest.register({
        email: 'tony@stark.io',
        fullName: 'Tony Stark',
        role: 'BUYER',
      });

      expect(res.statusCode).toBe(400);
    });

    test('when user does not fill required field -> ROLE', async () => {
      const res = await fakeAuthRequest.register({
        email: 'tony@stark.io',
        fullName: 'Tony Stark',
        password: '1111',
      });

      expect(res.statusCode).toBe(400);
    });

    test('when user does not fill required field -> FULL NAME', async () => {
      const res = await fakeAuthRequest.register({
        email: 'tony@stark.io',
        role: 'BUYER',
        password: '1111',
      });

      expect(res.statusCode).toBe(400);
    });

    test('when provided role is incorrect. BUYER and SELLER allowed', async () => {
      const res = await fakeAuthRequest.register({
        email: 'tony@stark.io',
        fullName: 'Tony Stark',
        role: 'INCORRECT_ROLE',
        password: '1111',
      });

      expect(res.statusCode).toBe(400);
    });

    test('when all registration fields is correct', async () => {
      const res = await fakeAuthRequest.register({
        email: 'tony@stark.io',
        fullName: 'Tony Stark',
        role: 'BUYER',
        password: '1111',
      });

      expect(res.statusCode).toBe(200);
    });

    test('when user with the same EMAIL already exists', async () => {
      const res = await fakeAuthRequest.register({
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
      const res = await fakeAuthRequest.login();

      expect(res.statusCode).toBe(400);
    });

    test('when user with current credentials does not exists.', async () => {
      const res = await fakeAuthRequest.login({
        email: 'tony@stark.io',
        password: 'incorrect_password',
      });

      expect(res.statusCode).toBe(400);
    });

    test('when user does not provide required field -> PASSWORD', async () => {
      const res = await fakeAuthRequest.login({
        email: 'tony@stark.io',
      });

      expect(res.statusCode).toBe(400);
    });

    test('when user does not provide required field -> EMAIL', async () => {
      const res = await fakeAuthRequest.login({
        password: 'incorrect_password',
      });

      expect(res.statusCode).toBe(400);
    });

    test('login with correct credentials.', async () => {
      const res = await fakeAuthRequest.login({
        email: 'tony@stark.io',
        password: '1111',
      });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('logout', () => {
    test('when unauthorized user tries to logout.', async () => {
      const res = await fakeAuthRequest.logout();

      expect(res.statusCode).toBe(401);
    });

    test('when authorized user tries to logout.', async () => {
      const loggedInUser = await fakeAuthRequest.login({
        email: 'tony@stark.io',
        password: '1111',
      });
      const cookie = loggedInUser.headers['set-cookie'];
      const res = await fakeAuthRequest.logout(cookie);

      expect(res.statusCode).toBe(200);
    });
  });
});
