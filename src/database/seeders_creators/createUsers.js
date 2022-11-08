import { USER_ROLES } from './data/roles';

const createUsers = () => {
  const password = '1234';

  const users = [
    {
      password,
      id: 1,
      fullName: 'John Wick',
      email: 'john@wick.io',
      role: USER_ROLES.seller,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      password,
      id: 2,
      fullName: 'Tony Stark',
      email: 'tony@stark.io',
      role: USER_ROLES.seller,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      password,
      id: 3,
      fullName: 'Leam Neeson',
      email: 'leam@neeson.io',
      role: USER_ROLES.buyer,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      password,
      id: 4,
      fullName: 'Albus Dambldor',
      email: 'albus@dambldor.io',
      role: USER_ROLES.buyer,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return users;
};

export default createUsers;
