import * as CartDeviceController from '../controllers/CartDeviceController';

const addToCartOptions = {
  handler: CartDeviceController.addToCart,
};

const getDevicesFromCartOptions = {
  handler: CartDeviceController.getDevicesFromCart,
};

const removeFromCartOptions = {
  handler: CartDeviceController.removeFromCart,
};

const cartDeviceRoutes = async (fastify) => {
  fastify.post('/api/cart-device', addToCartOptions);
  fastify.get('/api/cart-device', getDevicesFromCartOptions);
  fastify.delete('/api/cart-device/:deviceId', removeFromCartOptions);
};

export default cartDeviceRoutes;
