import 'dotenv/config';
import buildApp from '../src/app';
import models from '../src/database';
import { redisInstance } from '../src/plugins/setupRedisSession';

let appTestInstance;

beforeAll(() => {
  appTestInstance = buildApp();
});

afterAll(async () => {
  await models.User.destroy({ where: {} });
  await appTestInstance.close();

  redisInstance.client.flushall();
  redisInstance.client.quit();
});

export { appTestInstance };
