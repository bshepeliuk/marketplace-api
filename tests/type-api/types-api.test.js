import 'dotenv/config';
import models from '../../src/database';
import { createUser } from '../test-helpers/createUser';
import { fakeRequest } from '../test-helpers/fakeRequest';
import { appTestInstance } from '../tests-setup';

describe('Type API', () => {
  let typeId;
  let sessionCookies;

  beforeAll(async () => {
    fakeRequest.init(appTestInstance);

    const user = await createUser();
    const res = await fakeRequest.login({
      email: user.email,
      password: '12345',
    });

    sessionCookies = res.headers['set-cookie'];
  });

  afterAll(async () => {
    await models.Type.destroy({ where: {} });
  });

  test('when logged in user tries to add a new TYPE of DEVICES, should return 200.', async () => {
    const res = await fakeRequest.addNewType({
      cookie: sessionCookies,
      body: { name: 'NEW_TYPE_OF_DEVICES' },
    });

    typeId = JSON.parse(res.body).type.id;

    expect(res.statusCode).toBe(200);
  });

  test('when user tries to add a new TYPE of DEVICES without session cookies, should return 401.', async () => {
    const res = await fakeRequest.addNewType({
      body: { name: 'NEW_TYPE_OF_DEVICES' },
    });

    expect(res.statusCode).toBe(401);
  });

  test('when user tries to delete TYPE of DEVICES by ID without session cookies, should return 401.', async () => {
    const res = await fakeRequest.deleteTypeById({
      typeId,
    });

    expect(res.statusCode).toBe(401);
  });

  test('when logged in user tries to delete TYPE of DEVICES by ID, should return 200.', async () => {
    const res = await fakeRequest.deleteTypeById({
      typeId,
      cookie: sessionCookies,
    });

    expect(res.statusCode).toBe(200);
  });

  test('when logged in user tries to get all TYPES of DEVICES by ID, should return 200.', async () => {
    const res = await fakeRequest.getAllTypes(sessionCookies);

    expect(res.statusCode).toBe(200);
  });

  test('when user tries to get all TYPES of DEVICES without session cookies, should return 200.', async () => {
    const res = await fakeRequest.getAllTypes();

    expect(res.statusCode).toBe(401);
  });
});
