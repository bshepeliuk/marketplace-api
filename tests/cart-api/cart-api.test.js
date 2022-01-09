import 'dotenv/config';
import models from '../../src/database';
import { createDevice } from '../test-helpers/createDevice';
import { createUser } from '../test-helpers/createUser';
import { fakeRequest } from '../test-helpers/fakeRequest';
import { appTestInstance } from '../tests-setup';

describe('Cart API', () => {
  let user;
  let device;
  let sessionCookies;

  beforeAll(async () => {
    fakeRequest.init(appTestInstance);

    user = await createUser();
    device = await createDevice();

    const res = await fakeRequest.login({
      email: user.email,
      password: '12345',
    });

    sessionCookies = res.headers['set-cookie'];
  });

  afterAll(async () => {
    await models.Device.destroy({ where: {} });
  });

  test('when user tries to add device to cart with correct properties, should return code 200.', async () => {
    const res = await fakeRequest.addToCart({
      cookie: sessionCookies,
      body: {
        userId: user.id,
        deviceId: device.id,
        quantity: 1,
      },
    });

    expect(res.statusCode).toBe(200);
  });

  test('when unauthorized user tries to add device to own cart, should return code 401.', async () => {
    const res = await fakeRequest.addToCart({
      body: {
        userId: user.id,
        deviceId: device.id,
        quantity: 1,
      },
    });

    expect(res.statusCode).toBe(401);
  });

  test('when user did not fill required field [deviceId], should return code 400.', async () => {
    const res = await fakeRequest.addToCart({
      body: {
        quantity: 1,
      },
      cookie: sessionCookies,
    });

    expect(res.statusCode).toBe(400);
  });

  test('when user did not fill required field [quantity], should return code 400.', async () => {
    const res = await fakeRequest.addToCart({
      body: {
        deviceId: device.id,
      },
      cookie: sessionCookies,
    });

    expect(res.statusCode).toBe(400);
  });

  test('when user did not fill all fields, should return code 400.', async () => {
    const res = await fakeRequest.addToCart({
      body: {},
      cookie: sessionCookies,
    });

    expect(res.statusCode).toBe(400);
  });

  test('when unauthorized user tries to get devices from cart, should return code 401.', async () => {
    const res = await fakeRequest.getDevicesFromCart({ cookie: null });

    expect(res.statusCode).toBe(401);
  });

  test('when authorized user tries to get devices from cart, should return code 200.', async () => {
    const res = await fakeRequest.getDevicesFromCart({
      cookie: sessionCookies,
    });

    expect(res.statusCode).toBe(200);
  });

  test('should return code 200 when logged in user tries to delete device from cart.', async () => {
    const res = await fakeRequest.removeFromCartByDeviceId({
      cookie: sessionCookies,
      deviceId: device.id,
    });

    expect(res.statusCode).toBe(200);
  });

  test('should return code 401 when unathorized user tries to delete device from cart.', async () => {
    const res = await fakeRequest.removeFromCartByDeviceId({
      deviceId: device.id,
    });

    expect(res.statusCode).toBe(401);
  });

  test('should return code 500 when user did not provide required property ---> [deviceId].', async () => {
    const res = await fakeRequest.removeFromCartByDeviceId({
      cookie: sessionCookies,
    });

    expect(res.statusCode).toBe(500);
  });
});
