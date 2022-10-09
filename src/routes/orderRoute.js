import * as OrderController from '../controllers/OrderController';
import authGate from '../middlewares/authGate';

const getOrdersOptions = {
  handler: OrderController.getAll,
  preHandler: authGate,
};

const changeOrderStatusOptions = {
  handler: OrderController.changeOrderStatus,
  preHandler: authGate,
  config: {
    roles: ['SELLER'],
  },
};

const getOrderYearsOptions = {
  handler: OrderController.getAvailableYearsOptions,
  preHandler: authGate,
  config: {
    roles: ['SELLER'],
  },
};

const orderRoutes = async (fastify) => {
  fastify.get('/api/orders', getOrdersOptions);
  fastify.get('/api/orders/year-options', getOrderYearsOptions);
  fastify.patch('/api/order-status', changeOrderStatusOptions);
};

export default orderRoutes;
