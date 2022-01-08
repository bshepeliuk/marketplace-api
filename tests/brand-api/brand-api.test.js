import 'dotenv/config';
import buildApp from '../../src/app';
import models from '../../src/database';
import { redisInstance } from '../../src/plugins/setupRedisSession';
import { createUser } from '../test-helpers/createUser';
import { fakeRequest } from '../test-helpers/fakeRequest';

describe('Brand API', () => {
  let app;
  let brandId;
  let sessionCookies;

  beforeAll(async () => {
    app = buildApp();

    fakeRequest.init(app);

    const user = await createUser();
    const res = await fakeRequest.login({
      email: user.email,
      password: '12345',
    });

    sessionCookies = res.headers['set-cookie'];
  });

  afterAll(async () => {
    await app.close();
    await models.User.destroy({ where: {} });
    await models.Brand.destroy({ where: {} });
    // TODO: create helper for redis instance
    redisInstance.client.flushall();
    redisInstance.client.quit();
  });

  test('when logged in user tries to add a new brand, should return 200.', async () => {
    const res = await fakeRequest.addNewBrand({
      cookie: sessionCookies,
      body: { name: 'NEW_BRAND' },
    });

    brandId = JSON.parse(res.body).brand.id;

    expect(res.statusCode).toBe(200);
  });

  test('when user tries to add a new brand without session cookies, should return 401.', async () => {
    const res = await fakeRequest.addNewBrand({
      body: { name: 'NEW_BRAND' },
    });

    expect(res.statusCode).toBe(401);
  });

  test('when user tries to delete brand by ID without session cookies, should return 401.', async () => {
    const res = await fakeRequest.deleteBrandById({
      brandId,
    });

    expect(res.statusCode).toBe(401);
  });

  test('when logged in user tries to delete brand by ID, should return 200.', async () => {
    const res = await fakeRequest.deleteBrandById({
      brandId,
      cookie: sessionCookies,
    });

    expect(res.statusCode).toBe(200);
  });
});
