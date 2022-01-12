import 'dotenv/config';
import { createUser } from '../test-helpers/createUser';
import { fakeAuthRequest, fakeUserRequest } from '../test-helpers/fakeRequest';

describe('User API', () => {
  let sessionCookies;

  beforeAll(async () => {
    const user = await createUser();

    const res = await fakeAuthRequest.login({
      email: user.email,
      password: '12345',
    });

    sessionCookies = res.headers['set-cookie'];
  });

  test('when logged in user tries to get info about own account, should return 200.', async () => {
    const res = await fakeUserRequest.getUserInfo({
      cookie: sessionCookies,
    });

    expect(res.statusCode).toBe(200);
  });

  test('when logged in user tries to get info about own account without session cookies, should return 401.', async () => {
    const res = await fakeUserRequest.getUserInfo({});

    expect(res.statusCode).toBe(401);
  });
});
