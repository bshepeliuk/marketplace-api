import PasswordService from '../../services/PasswordService';

export default {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await PasswordService.hash('1234');

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          fullName: 'John Wick',
          email: 'john@wick.io',
          role: 'SELLER',
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: 'Tony Start',
          email: 'tony@stark.io',
          role: 'SELLER',
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: 'Leam Neeson',
          email: 'leam@neeson.io',
          role: 'BUYER',
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
