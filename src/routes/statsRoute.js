import authGate from '../middlewares/authGate';
import * as StatsController from '../controllers/StatsController';

const getStatsByDevicesOptions = {
  handler: StatsController.getStatsByDevices,
  preHandler: authGate,
  config: {
    roles: ['SELLER'],
  },
};

const statsRoutes = async (fastify) => {
  fastify.get('/api/stats', getStatsByDevicesOptions);
};

export default statsRoutes;
