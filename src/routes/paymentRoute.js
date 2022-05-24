import * as PaymentController from '../controllers/PaymentController';
import authGate from '../middlewares/authGate';
import * as PaymentSchema from '../validations/PaymentSchema';

const checkoutSessionOptions = {
  handler: PaymentController.createCheckoutSession,
  schema: PaymentSchema.checkoutSessionSchema,
  preHandler: authGate,
};

const paymentRoutes = async (fastify) => {
  fastify.post('/api/create-checkout-session', checkoutSessionOptions);
};

export default paymentRoutes;
