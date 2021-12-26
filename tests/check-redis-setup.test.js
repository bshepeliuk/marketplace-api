const Redis = require('redis');
// TODO: refactoring redis setup
describe('check Redis setup', () => {
  const userId = 'user-id-1';
  const fullName = 'Tony Stark';

  let redisClient = null;

  beforeAll(async () => {
    redisClient = await Redis.createClient();
  });

  afterAll(async () => {
    await redisClient.del(userId);
    await redisClient.quit();

    redisClient = null;
  });

  test('compare', async () => {
    redisClient.set(userId, JSON.stringify({ fullName }));

    redisClient.get(userId, (error, data) => {
      const user = JSON.parse(data);

      expect(fullName).toBe(user.fullName);
    });
  });
});
