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

  Devices

  id: 1 -> ASUS Zenbook 15
  id: 2 -> HP Pavillion 15 eh1021-ua
  id: 3 -> DELL Lattitude 7505
  id: 4 -> Lenovo Legion 5
  id: 5 -> Acer Nitro 5
  id: 6 -> Apple Macbook Pro

*/

// TODO: temp, only for tests
function generateDevices() {
  let id = 11;
  const result = [];

  for (let i = 0; i < 50; i++) {
    result.push({
      id: id++,
      name: `Test example № - ${i}`,
      price: 1_000,
      brandId: 1,
      typeId: 1,
      quantity: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return result;
}

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
        {
          id: 7,
          name: 'ASUS Vivobook Pro N7600PC-L2010',
          price: 25400,
          brandId: 1,
          typeId: 1,
          quantity: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          name: 'ASUS Zephyrus G14 GA401QM-HZ337T',
          price: 71099,
          brandId: 1,
          typeId: 1,
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 9,
          name: 'ASUS FX516PC-HN102',
          price: 32999,
          brandId: 1,
          typeId: 1,
          quantity: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 10,
          name: 'ASUS X415EA-EB952',
          price: 25400,
          brandId: 1,
          typeId: 1,
          quantity: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        ...generateDevices(),
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Devices', null, {});
  },
};
