import * as StripePaymentController from '../controllers/StripePaymentController';
import authGate from '../middlewares/authGate';

const checkoutSessionOptions = {
  handler: StripePaymentController.createCheckoutSession,
  preHandler: authGate,
};

const stripeWebHookOptions = {
  handler: StripePaymentController.stripeWebHook,
};

const paymentRoutes = async (fastify) => {
  fastify.post('/api/create-checkout-session', checkoutSessionOptions);
  fastify.post('/api/onboard-user', {
    handler: StripePaymentController.onBoardUser,
    preHandler: authGate,
  });

  fastify.addContentTypeParser(
    'application/json',
    { parseAs: 'string' },
    (req, body, done) => {
      try {
        const newBody = {
          raw: body,
          parsed: JSON.parse(body),
        };
        done(null, newBody);
      } catch (error) {
        error.statusCode = 400;
        done(error, undefined);
      }
    }
  );

  fastify.post('/api/webhook', stripeWebHookOptions);
};

export default paymentRoutes;
