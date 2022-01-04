import PasswordService from '../../src/services/PasswordService';
import UserService from '../../src/services/UserService';

describe('UserService', () => {
  let user = null;
  let userEmail = null;
  let userId = null;

  const nonExistentUser = {
    id: 999,
    email: 'non@existent.user',
  };

  beforeAll(async () => {
    const hashedPassword = await PasswordService.hash('12345');

    user = await UserService.create({
      email: 'leam@neeson.io',
      fullName: 'Leam Neeson',
      password: hashedPassword,
      role: 'SELLER',
    });
    userId = user.id;
    userEmail = user.email;
  });
  afterAll(async () => {
    user = null;
    userId = null;
    userEmail = null;

    await UserService.removeAllUsers();
  });

  test('when new user successfully added. [CREATE] method should return such fields: email, password, role, fullName', async () => {
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('role');
    expect(user).toHaveProperty('fullName');
    expect(user).toHaveProperty('id');
  });

  test('should return user by ID.', async () => {
    const u = await UserService.getById(userId);
    expect(userId).toBe(u.id);
  });

  test('should return NULL when try to find user with non-existent ID.', async () => {
    const u = await UserService.getById(nonExistentUser.id);
    expect(u).toBe(null);
  });

  test('should return user from by EMAIL.', async () => {
    const u = await UserService.getByEmail(userEmail);
    expect(userEmail).toBe(u.email);
  });

  test('should return NULL when try to find user with non-existent EMAIL.', async () => {
    const u = await UserService.getByEmail(nonExistentUser.email);
    expect(u).toBe(null);
  });

  test('should return FALSE in case EMAIL is unique.', async () => {
    const isItUniqueEmail = await UserService.isItUniqueEmail(
      nonExistentUser.email
    );

    expect(isItUniqueEmail).toBe(true);
  });

  test('should return FALSE in case EMAIL is not unique.', async () => {
    const isItUniqueEmail = await UserService.isItUniqueEmail(user.email);

    expect(isItUniqueEmail).toBe(false);
  });

  test('should return TRUE in case EMAIL is not unique.', async () => {
    const isNotUniqueEmail = await UserService.isNotUniqueEmail(user.email);

    expect(isNotUniqueEmail).toBe(true);
  });

  test('should return FALSE in case EMAIL is unique.', async () => {
    const isNotUniqueEmail = await UserService.isNotUniqueEmail(
      nonExistentUser.email
    );

    expect(isNotUniqueEmail).toBe(false);
  });

  test('should return TRUE in case credentials is correct.', async () => {
    const hasVerified = await UserService.verifyCredentials({
      email: 'leam@neeson.io',
      password: '12345',
    });

    expect(hasVerified).toBe(true);
  });

  test('should return FALSE in case PASSWORD is not correct.', async () => {
    const hasVerified = await UserService.verifyCredentials({
      email: 'leam@neeson.io',
      password: '12345_incorrect',
    });

    expect(hasVerified).toBe(false);
  });

  test('should return FALSE in case EMAIL is not correct.', async () => {
    const hasVerified = await UserService.verifyCredentials({
      email: 'leam@neeson_incorrect.io',
      password: '12345',
    });

    expect(hasVerified).toBe(false);
  });
});
