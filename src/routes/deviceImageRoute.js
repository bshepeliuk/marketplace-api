import * as DeviceImageController from '../controllers/DeviceImageController';
import authGate from '../middlewares/authGate';

const addDeviceImageOptions = {
  handler: DeviceImageController.add,
  preHandler: authGate,
};

const deviceImageRoutes = async (fastify) => {
  fastify.post('/api/device-image', addDeviceImageOptions);
};

export default deviceImageRoutes;
