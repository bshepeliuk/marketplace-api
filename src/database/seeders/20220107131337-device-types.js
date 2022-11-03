import { types } from '../seeders_creators';

export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Types', types, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Types_id_seq" RESTART WITH ${types.length + 1}`
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Types', null, {});
  },
};
