import { devices } from '../seeders_creators';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Devices', devices, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Devices_id_seq" RESTART WITH ${devices.length + 1}`
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Devices', null, {});
  },
};
