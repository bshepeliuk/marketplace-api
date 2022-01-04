import * as DeviceController from '../controllers/DeviceController';

const addDeviceOptions = {
  handler: DeviceController.add,
};

const getAllDevicesOptions = {
  handler: DeviceController.getAll,
};

const getDeviceByIdOptions = {
  handler: DeviceController.getOne,
};

const deviceRoutes = async (fastify) => {
  fastify.post('/api/device', addDeviceOptions);
  fastify.get('/api/device', getAllDevicesOptions);
  fastify.get('/api/device/:deviceId', getDeviceByIdOptions);
};

export default deviceRoutes;
