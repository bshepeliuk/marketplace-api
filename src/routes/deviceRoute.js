import * as DeviceController from '../controllers/DeviceController';
import * as validation from '../validations/DeviceSchema';

const addDeviceOptions = {
  handler: DeviceController.add,
  schema: validation.addDeviceSchema,
};

const getAllDevicesOptions = {
  handler: DeviceController.getAll,
  schema: validation.getDevicesSchema,
  params: validation.devicesParamsSchema,
};

const getDeviceByIdOptions = {
  handler: DeviceController.getOne,
  schema: validation.getDeviceSchema,
  params: validation.deviceParamsSchema,
};

const getMinMaxPriceOptions = {
  handler: DeviceController.getMinAndMaxPrices,
  schema: validation.minMaxDevicePriceSchema,
};

const deviceRoutes = async (fastify) => {
  fastify.post('/api/devices', addDeviceOptions);
  fastify.get('/api/devices', getAllDevicesOptions);
  fastify.get('/api/devices/:deviceId', getDeviceByIdOptions);
  // TODO: change path name
  fastify.get('/api/min-max-price/:typeId', getMinMaxPriceOptions);
};

export default deviceRoutes;
