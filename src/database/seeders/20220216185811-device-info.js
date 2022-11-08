import { details } from '../seeders_creators';

export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('DeviceInfos', details, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "DeviceInfos_id_seq" RESTART WITH ${details.length + 1}`
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('DeviceInfos', null, {});
  },
};
