import 'dotenv/config';
import models from '../../src/database';
import { createUser } from '../test-helpers/createUser';
import { fakeAuthRequest, fakeBrandRequest } from '../test-helpers/fakeRequest';

describe('Brand API', () => {
  let brandId;
  let sessionCookies;

  beforeAll(async () => {
    const user = await createUser();
    const res = await fakeAuthRequest.login({
      email: user.email,
      password: '12345',
    });

    sessionCookies = res.headers['set-cookie'];
  });

  afterAll(async () => {
    await models.Brand.destroy({ where: {} });
  });

  test('when logged in user tries to add a new brand, should return 200.', async () => {
    const res = await fakeBrandRequest.addNewBrand({
      cookie: sessionCookies,
      body: { name: 'NEW_BRAND' },
    });

    brandId = JSON.parse(res.body).brand.id;

    expect(res.statusCode).toBe(200);
  });

  test('when user tries to add a new brand without session cookies, should return 401.', async () => {
    const res = await fakeBrandRequest.addNewBrand({
      body: { name: 'NEW_BRAND' },
    });

    expect(res.statusCode).toBe(401);
  });

  test('when user tries to delete brand by ID without session cookies, should return 401.', async () => {
    const res = await fakeBrandRequest.deleteBrandById({
      brandId,
    });

    expect(res.statusCode).toBe(401);
  });

  test('when logged in user tries to delete brand by ID, should return 200.', async () => {
    const res = await fakeBrandRequest.deleteBrandById({
      brandId,
      cookie: sessionCookies,
    });

    expect(res.statusCode).toBe(200);
  });

  test('when logged in user tries to get all BRANDS of DEVICES, should return 200.', async () => {
    const res = await fakeBrandRequest.getAllBrands(sessionCookies);

    expect(res.statusCode).toBe(200);
  });

  test('when user tries to get all BRANDS of DEVICES without session cookies, should return 200.', async () => {
    const res = await fakeBrandRequest.getAllBrands();

    expect(res.statusCode).toBe(200);
  });
});
