module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'DeviceImages',
      [
        {
          url: 'https://content2.rozetka.com.ua/goods/images/big/243934866.jpg',
          deviceId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url:
            'https://i.eldorado.ua///goods_images/1579029/33bfc43a75537a9ed720eda746314780.jpg',
          deviceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'https://content.rozetka.com.ua/goods/images/big/194295560.jpg',
          deviceId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url:
            'https://i.eldorado.ua//goods_images/1039096/7622609-1641906851.jpg',
          deviceId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'https://content2.rozetka.com.ua/goods/images/big/231490106.jpg',
          deviceId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'https://content2.rozetka.com.ua/goods/images/big/30872610.jpg',
          deviceId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'https://content1.rozetka.com.ua/goods/images/big/192398803.jpg',
          deviceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url: 'https://content.rozetka.com.ua/goods/images/big/192397724.jpg',
          deviceId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url:
            'https://i.allo.ua/media/catalog/product/cache/3/image/620x600/602f0fa2c1f0d1ba5e241f914e856ff9/0/3/033d63cb-3e1a-4aba-a4a5-95a02a603875_result_1.jpg',
          deviceId: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          url:
            'https://i.allo.ua/media/catalog/product/cache/3/image/620x600/602f0fa2c1f0d1ba5e241f914e856ff9/4/0/40db0352-217c-4573-ab74-13f7d3ffe16d_result.jpg',
          deviceId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url:
            'https://i.allo.ua/media/catalog/product/cache/3/image/620x600/602f0fa2c1f0d1ba5e241f914e856ff9/1/1/1193739_zoom.jpg',
          deviceId: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          url:
            'https://i.allo.ua/media/catalog/product/cache/3/image/620x600/602f0fa2c1f0d1ba5e241f914e856ff9/u/0/u0617974_big_result_1.jpg',
          deviceId: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('DeviceImages', null, {});
  },
};

/*

  Devices

  id: 1 -> ASUS Zenbook 15
  id: 2 -> HP Pavillion 15 eh1021-ua
  id: 3 -> DELL Lattitude 7505
  id: 4 -> Lenovo Legion 5
  id: 5 -> Acer Nitro 5
  id: 6 -> Apple Macbook Pro

*/
