import * as PaymentController from '../controllers/PaymentController';
import * as PaymentSchema from '../validations/PaymentSchema';
import authGate from '../middlewares/authGate';

const checkoutSessionOptions = {
  handler: PaymentController.createCheckoutSession,
  schema: PaymentSchema.checkoutSessionSchema,
  preHandler: authGate,
};

const paymentRoutes = async (fastify) => {
  fastify.post('/api/create-checkout-session', checkoutSessionOptions);
  fastify.post('/api/onboard-user', {
    handler: PaymentController.onBoardUser,
    preHandler: authGate,
  });
};

export default paymentRoutes;
