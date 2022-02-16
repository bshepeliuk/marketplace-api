import { deviceImages } from '../seeders_creators';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('DeviceImages', deviceImages, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('DeviceImages', null, {});
  },
};
