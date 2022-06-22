import { deviceDetails } from '../seeders_creators';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('DeviceInfos', deviceDetails, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "DeviceInfos_id_seq" RESTART WITH ${deviceDetails.length +
        1}`
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('DeviceInfos', null, {});
  },
};
