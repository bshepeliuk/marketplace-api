import PasswordService from '../../src/services/PasswordService';
import UserService from '../../src/services/UserService';

export const createUser = async () => {
  const hashedPassword = await PasswordService.hash('12345');

  const user = await UserService.create({
    email: 'leam@neeson.io',
    fullName: 'Leam Neeson',
    password: hashedPassword,
    role: 'SELLER',
  });

  return user;
};
