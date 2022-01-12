import * as CartController from '../controllers/CartController';
import * as validation from '../validations/CartSchema';

const addToCartOptions = {
  schema: validation.AddToCartSchema,
  handler: CartController.addToCart,
};

const getDevicesFromCartOptions = {
  handler: CartController.getDevicesFromCart,
};

const removeFromCartOptions = {
  handler: CartController.removeFromCart,
};

const cartRoutes = async (fastify) => {
  fastify.post('/api/cart', addToCartOptions);
  fastify.get('/api/cart/items', getDevicesFromCartOptions);
  fastify.delete('/api/cart/:deviceId', removeFromCartOptions);
};

export default cartRoutes;
