import { ratings } from '../seeders_creators';

export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Ratings', ratings, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "Ratings_id_seq" RESTART WITH ${ratings.length + 1}`
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Ratings', null, {});
  },
};
