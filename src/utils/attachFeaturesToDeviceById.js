import DeviceInfoService from '../services/DeviceInfoService';

const attachFeaturesToDeviceById = async ({ features, deviceId, typeId }) => {
  for (const feature of features) {
    await DeviceInfoService.create({
      deviceId,
      typeId,
      title: feature.title,
      description: feature.description,
    });
  }
};

export default attachFeaturesToDeviceById;
