const { default: models } = require('../src/database');

describe('check PostgreSQL setup', () => {
  let user = null;

  beforeAll(async () => {
    user = await models.User.create({
      email: 'john@ukr.net',
      fullName: 'John Wick',
      role: 'BUYER',
      password: '1234',
    });
  });

  afterAll(async () => {
    await models.User.destroy({ where: { email: 'john@ukr.net' } });
  });

  test('compare', async () => {
    expect('john@ukr.net').toBe(user.email);
  });
});
