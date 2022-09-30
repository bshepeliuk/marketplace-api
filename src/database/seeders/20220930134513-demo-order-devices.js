import { orderDevices } from '../seeders_creators';

export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('OrderDevices', orderDevices, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "OrderDevices_id_seq" RESTART WITH ${orderDevices.length +
        1}`
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('OrderDevices', null, {});
  },
};
