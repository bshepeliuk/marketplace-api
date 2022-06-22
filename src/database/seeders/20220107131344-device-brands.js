import { deviceBrands } from '../seeders_creators';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Brands', deviceBrands, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Brands_id_seq" RESTART WITH ${deviceBrands.length + 1}`
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Brands', null, {});
  },
};
