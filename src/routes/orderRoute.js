import * as OrderController from '../controllers/OrderController';
import authGate from '../middlewares/authGate';

const getOrdersOptions = {
  handler: OrderController.getAll,
  preHandler: authGate,
};

const orderRoutes = async (fastify) => {
  fastify.get('/api/orders', getOrdersOptions);
};

export default orderRoutes;
