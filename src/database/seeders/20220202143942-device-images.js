const { deviceImages } = require('../seeders_creators');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log({ deviceImages });
    await queryInterface.bulkInsert('DeviceImages', deviceImages, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('DeviceImages', null, {});
  },
};
