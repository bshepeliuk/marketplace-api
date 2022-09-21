export default {
  up: async (queryInterface) => {
    const accounts = [
      {
        userId: 1,
        accountId: 'acct_1LkU4XRQkVt74bk7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        accountId: 'acct_1L42L8RMZcLvIy3D',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        accountId: 'acct_1LkUHdRABQjDk9Db',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Stripes', accounts, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Stripes_id_seq" RESTART WITH ${accounts.length + 1}`
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Stripes', null, {});
  },
};
