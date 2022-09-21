import PasswordService from '../../services/PasswordService';

export default {
  up: async (queryInterface) => {
    const hashedPassword = await PasswordService.hash('1234');

    const users = [
      {
        id: 1,
        fullName: 'John Wick',
        email: 'john@wick.io',
        role: 'SELLER',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        fullName: 'Tony Stark',
        email: 'tony@stark.io',
        role: 'SELLER',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        fullName: 'Leam Neeson',
        email: 'leam@neeson.io',
        role: 'BUYER',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        fullName: 'Albus Dambldor',
        email: 'albus@dambldor.io',
        role: 'SELLER',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Users', users, {});

    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Users_id_seq" RESTART WITH ${users.length + 1}`
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
