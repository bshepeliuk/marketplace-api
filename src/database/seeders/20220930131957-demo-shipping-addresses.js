import { shippingAddresses } from '../seeders_creators';

export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('ShippingAddresses', shippingAddresses, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "ShippingAddresses_id_seq" RESTART WITH ${shippingAddresses.length +
        1}`
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ShippingAddresses', null, {});
  },
};
