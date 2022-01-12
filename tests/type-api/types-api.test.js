import 'dotenv/config';
import models from '../../src/database';
import { createUser } from '../test-helpers/createUser';
import { fakeAuthRequest, fakeTypeRequest } from '../test-helpers/fakeRequest';

describe('Type API', () => {
  let typeId;
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
    await models.Type.destroy({ where: {} });
  });

  test('when logged in user tries to add a new TYPE of DEVICES, should return 200.', async () => {
    const res = await fakeTypeRequest.addNewType({
      cookie: sessionCookies,
      body: { name: 'NEW_TYPE_OF_DEVICES' },
    });

    typeId = JSON.parse(res.body).type.id;

    expect(res.statusCode).toBe(200);
  });

  test('when user tries to add a new TYPE of DEVICES without session cookies, should return 401.', async () => {
    const res = await fakeTypeRequest.addNewType({
      body: { name: 'NEW_TYPE_OF_DEVICES' },
    });

    expect(res.statusCode).toBe(401);
  });

  test('when user tries to delete TYPE of DEVICES by ID without session cookies, should return 401.', async () => {
    const res = await fakeTypeRequest.deleteTypeById({
      typeId,
    });

    expect(res.statusCode).toBe(401);
  });

  test('when logged in user tries to delete TYPE of DEVICES by ID, should return 200.', async () => {
    const res = await fakeTypeRequest.deleteTypeById({
      typeId,
      cookie: sessionCookies,
    });

    expect(res.statusCode).toBe(200);
  });

  test('when logged in user tries to get all TYPES of DEVICES by ID, should return 200.', async () => {
    const res = await fakeTypeRequest.getAllTypes(sessionCookies);

    expect(res.statusCode).toBe(200);
  });

  test('when user tries to get all TYPES of DEVICES without session cookies, should return 200.', async () => {
    const res = await fakeTypeRequest.getAllTypes();

    expect(res.statusCode).toBe(401);
  });
});
