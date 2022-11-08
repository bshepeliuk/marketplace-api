import { convertListToObjectByOptions } from './helpers/convertListToObjectByOptions';

const createDeviceImages = ({ devices, mockValues }) => {
  const result = [];
  let id = 1;

  const deviceIdByName = convertListToObjectByOptions({
    data: devices,
    key: 'name',
    value: 'id',
  });

  for (const [_, mockDeviceList] of Object.entries(mockValues)) {
    for (const device of mockDeviceList) {
      let counter = 1;
      for (const url of device.images) {
        let preview = false;

        if (counter === 1) {
          preview = true;
        }

        result.push({
          url,
          preview,
          id: ++id,
          deviceId: deviceIdByName[device.name],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        counter += 1;
      }
    }
  }

  return result;
};

export default createDeviceImages;
