import { brands } from '../seeders_creators';

export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Brands', brands, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Brands_id_seq" RESTART WITH ${brands.length + 1}`
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Brands', brands, {});
  },
};
