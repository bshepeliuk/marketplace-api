import { convertListToObjectByOptions } from './helpers/convertListToObjectByOptions';
import { generateRandomDate } from './helpers/generateRandomDate';
import { generateRandomInteger } from './helpers/generateRandomInteger';
import { getBrandIdByTitle } from './helpers/getBrandIdByTitle';

const createDevices = ({ types, brands, mockValues }) => {
  const typeIdByName = convertListToObjectByOptions({
    data: types,
    key: 'name',
    value: 'id',
  });

  const result = [];
  let id = 1;

  for (const [type, deviceList] of Object.entries(mockValues)) {
    for (const device of deviceList) {
      const date = generateRandomDate({
        start: new Date(2021, 0, 1),
        end: new Date(),
      });

      result.push({
        id: id++,
        name: device.name,
        createdAt: date,
        updatedAt: date,
        typeId: typeIdByName[type],
        brandId: getBrandIdByTitle({ title: device.brand, brands }),
        price: generateRandomInteger({ min: 10_000, max: 50_000 }),
        quantity: generateRandomInteger({ min: 1, max: 10 }),
        userId: generateRandomInteger({ min: 1, max: 2 }),
      });
    }
  }

  return result;
};

export default createDevices;
