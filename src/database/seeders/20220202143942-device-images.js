import { deviceImages } from '../seeders_creators';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('DeviceImages', deviceImages, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "DeviceImages_id_seq" RESTART WITH ${deviceImages.length +
        1}`
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('DeviceImages', null, {});
  },
};
