import 'dotenv/config';
import buildApp from '../src/app';
import models from '../src/database';
import { redisInstance } from '../src/plugins/setupRedisSession';
import { fakeRequestInitialization } from './test-helpers/fakeRequest';

let appTestInstance;

beforeAll(() => {
  appTestInstance = buildApp();

  fakeRequestInitialization(appTestInstance);
});

afterAll(async () => {
  await models.User.destroy({ where: {} });
  await appTestInstance.close();

  redisInstance.client.flushall();
  redisInstance.client.quit();
});

export { appTestInstance };
