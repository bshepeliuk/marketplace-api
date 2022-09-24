import * as PurchaseController from '../controllers/PurchaseController';
import authGate from '../middlewares/authGate';

const getPurchasesOptions = {
  handler: PurchaseController.getAll,
  preHandler: authGate,
};

const purchaseRoutes = async (fastify) => {
  fastify.get('/api/purchases', getPurchasesOptions);
};

export default purchaseRoutes;
