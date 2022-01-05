import * as DeviceImageController from '../controllers/DeviceImageController';

const addDeviceImageOptions = {
  handler: DeviceImageController.add,
};

const deviceImageRoutes = async (fastify) => {
  fastify.post('/api/device-image', addDeviceImageOptions);
};

export default deviceImageRoutes;
