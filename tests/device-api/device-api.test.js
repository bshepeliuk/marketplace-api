import 'dotenv/config';
import models from '../../src/database';
import BrandService from '../../src/services/BrandService';
import TypeService from '../../src/services/TypeService';
import { createUser } from '../test-helpers/createUser';
import {
  fakeAuthRequest,
  fakeDeviceRequest,
} from '../test-helpers/fakeRequest';

describe('Device API', () => {
  let user;
  let sessionCookies;
  let brand;
  let type;
  let deviceId;

  beforeAll(async () => {
    user = await createUser();

    const res = await fakeAuthRequest.login({
      email: user.email,
      password: '12345',
    });

    sessionCookies = res.headers['set-cookie'];

    brand = await BrandService.create({ name: 'HP' });
    type = await TypeService.create({ name: 'laptops' });
  });

  afterAll(async () => {
    await models.Device.destroy({ where: {} });
    await models.Brand.destroy({ where: {} });
    await models.Type.destroy({ where: {} });
  });

  describe('Logged in user', () => {
    test('when user tries to add a new device with correct properties, should return code 200.', async () => {
      const res = await fakeDeviceRequest.addDevice({
        cookie: sessionCookies,
        body: {
          name: 'HP Pavillion 15',
          price: 30_000,
          brandId: brand.id,
          typeId: type.id,
          quantity: 56,
        },
      });

      deviceId = JSON.parse(res.body).device.id;

      expect(res.statusCode).toBe(200);
    });

    test('when user provided ID of BRAND which does not exist, should return code 500.', async () => {
      const res = await fakeDeviceRequest.addDevice({
        cookie: sessionCookies,
        body: {
          name: 'HP Pavillion 15',
          price: 30_000,
          brandId: 1_000_000_000,
          typeId: type.id,
          quantity: 56,
        },
      });

      expect(res.statusCode).toBe(500);
    });

    test('when user did not provide ID of DEVICE BRAND, should return code 400. [brandId] is required', async () => {
      const res = await fakeDeviceRequest.addDevice({
        cookie: sessionCookies,
        body: {
          name: 'HP Pavillion 15',
          price: 30_000,
          typeId: type.id,
          quantity: 56,
        },
      });

      expect(res.statusCode).toBe(400);
    });

    test('when user did not provide ID of DEVICE TYPE, should return code 400. [typeId] is required', async () => {
      const res = await fakeDeviceRequest.addDevice({
        cookie: sessionCookies,
        body: {
          name: 'HP Pavillion 15',
          brandId: brand.id,
          price: 30_000,
          quantity: 56,
        },
      });

      expect(res.statusCode).toBe(400);
    });

    test('when user did not provide PRICE of DEVICE, should return code 400. [price] is required', async () => {
      const res = await fakeDeviceRequest.addDevice({
        cookie: sessionCookies,
        body: {
          name: 'HP Pavillion 15',
          brandId: brand.id,
          typeId: type.id,
          quantity: 56,
        },
      });

      expect(res.statusCode).toBe(400);
    });

    test('when user did not provide QUANTITY of DEVICES, should return code 400. [quantity] is required', async () => {
      const res = await fakeDeviceRequest.addDevice({
        cookie: sessionCookies,
        body: {
          name: 'HP Pavillion 15',
          brandId: brand.id,
          typeId: type.id,
          price: 30_000,
        },
      });

      expect(res.statusCode).toBe(400);
    });

    test('when user did not provide NAME of DEVICE, should return code 400. [name] is required', async () => {
      const res = await fakeDeviceRequest.addDevice({
        cookie: sessionCookies,
        body: {
          brandId: brand.id,
          typeId: type.id,
          price: 30_000,
          quantity: 56,
        },
      });

      expect(res.statusCode).toBe(400);
    });

    test('when all required fields are empty, should return code 400.', async () => {
      const res = await fakeDeviceRequest.addDevice({
        cookie: sessionCookies,
        body: {},
      });

      expect(res.statusCode).toBe(400);
    });

    test('get all devices, should return code 200.', async () => {
      const res = await fakeDeviceRequest.getAllDevice({
        cookie: sessionCookies,
      });

      expect(res.statusCode).toBe(200);
    });

    test('whe user tries to get device by ID, should return code 200.', async () => {
      const res = await fakeDeviceRequest.getDeviceById({
        deviceId,
        cookie: sessionCookies,
      });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('Unauthorized user', () => {
    test('when user tries to add a new device without session cookies, should return code 401.', async () => {
      const res = await fakeDeviceRequest.addDevice({
        body: {
          name: 'HP Pavillion 15',
          price: 30_000,
          brandId: brand.id,
          typeId: type.id,
          quantity: 56,
        },
      });

      expect(res.statusCode).toBe(401);
    });

    test('whe user tries to get all devices, should return code 200.', async () => {
      const res = await fakeDeviceRequest.getAllDevice({});

      expect(res.statusCode).toBe(200);
    });

    test('whe user tries to get device by ID, should return code 200.', async () => {
      const res = await fakeDeviceRequest.getDeviceById({ deviceId });

      expect(res.statusCode).toBe(200);
    });
  });
});
