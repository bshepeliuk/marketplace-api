import * as CartItemController from '../controllers/CartItemController';

const addToCartOptions = {
  handler: CartItemController.addToCart,
};

const getDevicesFromCartOptions = {
  handler: CartItemController.getDevicesFromCart,
};

const removeFromCartOptions = {
  handler: CartItemController.removeFromCart,
};

const cartItemRoutes = async (fastify) => {
  fastify.post('/api/cart-items', addToCartOptions);
  fastify.get('/api/cart-items', getDevicesFromCartOptions);
  fastify.delete('/api/cart-items/:deviceId', removeFromCartOptions);
};

export default cartItemRoutes;
