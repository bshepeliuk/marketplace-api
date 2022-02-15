import { devices, testDevices } from '../seeders_creators';
console.log({ testDevices });
export default {
  up: async (queryInterface, Sequelize) => {
    console.log({ devices });
    await queryInterface.bulkInsert(
      'Devices',
      [...devices, ...testDevices],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Devices', null, {});
  },
};
