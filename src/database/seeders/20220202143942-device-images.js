import { images } from '../seeders_creators';

export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('DeviceImages', images, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "DeviceImages_id_seq" RESTART WITH ${images.length + 1}`
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('DeviceImages', null, {});
  },
};
