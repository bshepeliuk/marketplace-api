import * as CartController from '../controllers/CartController';
import * as validation from '../validations/CartSchema';
import authGate from '../middlewares/authGate';

const addToCartOptions = {
  schema: validation.AddToCartSchema,
  handler: CartController.addToCart,
  preHandler: authGate,
};

const getDevicesFromCartOptions = {
  handler: CartController.getDevicesFromCart,
  preHandler: authGate,
};

const removeFromCartOptions = {
  handler: CartController.removeFromCart,
  preHandler: authGate,
};

const cartRoutes = async (fastify) => {
  fastify.post('/api/cart', addToCartOptions);
  fastify.get('/api/cart/items', getDevicesFromCartOptions);
  fastify.delete('/api/cart/:deviceId', removeFromCartOptions);
};

export default cartRoutes;
