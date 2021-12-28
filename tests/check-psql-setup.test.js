const { default: models } = require('../src/database');

describe('check PostgreSQL setup', () => {
  const email = 'john@ukr.net';
  let user = null;

  beforeAll(async () => {
    user = await models.User.create({
      email,
      fullName: 'John Wick',
      role: 'BUYER',
      password: '1234',
    });
  });

  afterAll(async () => {
    await models.User.destroy({ where: { email } });
  });

  test('compare', async () => {
    expect(email).toBe(user.email);
  });
});
