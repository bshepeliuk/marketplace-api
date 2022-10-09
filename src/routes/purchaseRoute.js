import * as PurchaseController from '../controllers/PurchaseController';
import authGate from '../middlewares/authGate';

const getPurchasesOptions = {
  handler: PurchaseController.getAll,
  preHandler: authGate,
};

const getPurchasesYearOptions = {
  handler: PurchaseController.getAvailableYearsOptions,
  preHandler: authGate,
  config: {
    roles: ['BUYER'],
  },
};

const purchaseRoutes = async (fastify) => {
  fastify.get('/api/purchases', getPurchasesOptions);
  fastify.get('/api/purchases/year-options', getPurchasesYearOptions);
};

export default purchaseRoutes;
