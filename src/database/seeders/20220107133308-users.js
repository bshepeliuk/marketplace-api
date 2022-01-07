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
          fullName: 'Tony Wick',
          email: 'tony@stark.io',
          role: 'SELLER',
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
