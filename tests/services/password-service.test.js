import PasswordService from '../../src/services/PasswordService';

describe('PasswordService', () => {
  let hashedPassword = '';
  const password = '1111';

  beforeAll(async () => {
    hashedPassword = await PasswordService.hash(password);
  });

  afterAll(() => {
    hashedPassword = '';
  });

  test('when password is correct', async () => {
    const hasVerified = await PasswordService.verify({
      password,
      hash: hashedPassword,
    });

    expect(hasVerified).toBe(true);
  });

  test('when password is incorrect', async () => {
    const hasVerified = await PasswordService.verify({
      password: 'incorrect_password',
      hash: hashedPassword,
    });

    expect(hasVerified).toBe(false);
  });
});
