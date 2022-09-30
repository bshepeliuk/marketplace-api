import { orders } from '../seeders_creators';

export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Orders', orders, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Orders_id_seq" RESTART WITH ${orders.length + 1}`
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
