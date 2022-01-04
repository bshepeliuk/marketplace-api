import * as CartController from '../controllers/CartController';

const addCartOptions = {
  handler: CartController.create,
};

const getCartOptions = {
  handler: CartController.get,
};

const cartRoutes = async (fastify) => {
  fastify.post('/api/cart', addCartOptions);
  fastify.get('/api/cart', getCartOptions);
};

export default cartRoutes;
