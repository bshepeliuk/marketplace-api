import { convertListToObjectByOptions } from './helpers/convertListToObjectByOptions';
import { getRandomFromList } from './helpers/getRandomFromList';

export const createDeviceDetails = ({ devices, details, types }) => {
  const result = [];
  let id = 1;

  const typeIdByNames = convertListToObjectByOptions({
    data: types,
    key: 'name',
    value: 'id',
  });

  for (const device of devices) {
    for (const [type, features] of Object.entries(details)) {
      for (const [title, description] of features) {
        if (device.typeId === typeIdByNames[type]) {
          result.push({
            title,
            typeId: typeIdByNames[type],
            id: ++id,
            deviceId: device.id,
            description: getRandomFromList(description),
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }
    }
  }

  return result;
};
