import { deviceTypes } from '../seeders_creators';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Types', deviceTypes, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Types_id_seq" RESTART WITH ${deviceTypes.length + 1}`
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Types', null, {});
  },
};
