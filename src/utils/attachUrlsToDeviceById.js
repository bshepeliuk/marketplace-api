import DeviceImageService from '../services/DeviceImageService';

const attachUrlsToDeviceById = async ({ urls, deviceId }) => {
  for (const url of urls) {
    await DeviceImageService.create({
      deviceId,
      url,
    });
  }
};

export default attachUrlsToDeviceById;
