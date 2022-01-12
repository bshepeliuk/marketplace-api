import 'dotenv/config';
import models from '../../src/database';
import { createDevice } from '../test-helpers/createDevice';
import { createUser } from '../test-helpers/createUser';
import {
  fakeAuthRequest,
  fakeRatingRequest,
} from '../test-helpers/fakeRequest';

describe('Rating API', () => {
  let sessionCookies;
  let user;
  let device;

  beforeAll(async () => {
    user = await createUser();
    device = await createDevice();

    const res = await fakeAuthRequest.login({
      email: user.email,
      password: '12345',
    });

    sessionCookies = res.headers['set-cookie'];
  });

  afterAll(async () => {
    await models.Rating.destroy({ where: {} });
    await models.Device.destroy({ where: {} });
  });

  test('when logged in user tries to add rating for device, should return 200.', async () => {
    const res = await fakeRatingRequest.addRatingForDevice({
      cookie: sessionCookies,
      body: {
        rate: 5,
        deviceId: device.id,
        userId: user.id,
      },
    });

    expect(res.statusCode).toBe(200);
  });

  test('when user tries to add rating for device without session cookies, should return 401.', async () => {
    const res = await fakeRatingRequest.addRatingForDevice({
      body: {
        rate: 5,
        deviceId: device.id,
        userId: user.id,
      },
    });

    expect(res.statusCode).toBe(401);
  });

  test('when user did not provide required field - [RATE], should return 400.', async () => {
    const res = await fakeRatingRequest.addRatingForDevice({
      cookie: sessionCookies,
      body: {
        deviceId: device.id,
        userId: user.id,
      },
    });

    expect(res.statusCode).toBe(400);
  });

  test('when user did not provide required field - [deviceId], should return 400.', async () => {
    const res = await fakeRatingRequest.addRatingForDevice({
      cookie: sessionCookies,
      body: {
        rate: 5,
        userId: user.id,
      },
    });

    expect(res.statusCode).toBe(400);
  });

  test('when user did not provide required field - [userId], should return 400.', async () => {
    const res = await fakeRatingRequest.addRatingForDevice({
      cookie: sessionCookies,
      body: {
        rate: 5,
        deviceId: device.id,
      },
    });

    expect(res.statusCode).toBe(400);
  });

  test('when user did not provide all required fields, should return 400.', async () => {
    const res = await fakeRatingRequest.addRatingForDevice({
      cookie: sessionCookies,
      body: {},
    });

    expect(res.statusCode).toBe(400);
  });
});
