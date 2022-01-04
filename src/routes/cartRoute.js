import * as CartController from '../controllers/CartController';
// import * as DeviceController from '../controllers/DeviceController';

const addCartOptions = {
  handler: CartController.create,
};

const getCartOptions = {
  handler: CartController.get,
};

// const addToCartOptions = {
//   handler: CartController.addToCart,
// };

// const getDevicesFromCartOptions = {
//   handler: DeviceController.getDevicesFromCart,
// };

// const removeFromCartOptions = {
//   handler: CartController.removeFromCart,
// };

const cartRoutes = async (fastify) => {
  fastify.post('/api/cart', addCartOptions);
  fastify.get('/api/cart', getCartOptions);
  // fastify.post('/api/cart', addToCartOptions);
  // fastify.get('/api/cart/:cartId', getDevicesFromCartOptions);
  // fastify.delete('/api/cart/device/:deviceId', removeFromCartOptions); // TODO: refactoring
};

export default cartRoutes;
