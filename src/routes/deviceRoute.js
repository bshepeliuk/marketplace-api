import * as DeviceController from '../controllers/DeviceController';
import * as validation from '../validations/DeviceSchema';

const addDeviceOptions = {
  handler: DeviceController.add,
  schema: validation.addDeviceSchema,
};

const getAllDevicesOptions = {
  handler: DeviceController.getAll,
  schema: validation.getDevicesSchema,
};

const getDeviceByIdOptions = {
  handler: DeviceController.getOne,
  schema: validation.getDeviceSchema,
  params: validation.deviceParamsSchema,
};

const deviceRoutes = async (fastify) => {
  fastify.post('/api/devices', addDeviceOptions);
  fastify.get('/api/devices', getAllDevicesOptions);
  fastify.get('/api/devices/:deviceId', getDeviceByIdOptions);
};

export default deviceRoutes;
