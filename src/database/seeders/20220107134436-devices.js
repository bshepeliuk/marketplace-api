/*

  Types

  id: 1 -> 'laptops'
  id: 2 -> 'tablets'
  id: 3 -> 'phones'
  id: 4 -> 'TVs'
  id: 5 -> 'cameras'

  Brands

  id: 1 -> 'ASUS',
  id: 2 -> 'HP',
  id: 3 -> 'APPLE',
  id: 4 -> 'DELL',
  id: 5 -> 'LENOVO',
  id: 6 -> 'ACER',

*/

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Devices',
      [
        {
          id: 1,
          name: 'ASUS Zenbook 15',
          price: 30000,
          brandId: 1,
          typeId: 1,
          quantity: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'HP Pavillion 15 eh1021-ua',
          price: 27500,
          brandId: 2,
          typeId: 1,
          quantity: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'DELL Lattitude 7505',
          price: 27500,
          brandId: 4,
          typeId: 1,
          quantity: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: 'Lenovo Legion 5',
          price: 34100,
          brandId: 5,
          typeId: 1,
          quantity: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: 'Acer Nitro 5',
          price: 15500,
          brandId: 5,
          typeId: 1,
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          name: 'Apple Macbook Pro',
          price: 35800,
          brandId: 3,
          typeId: 1,
          quantity: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Devices', null, {});
  },
};
