import models from '../database';

const CartService = {
  async addToCart({ userId, deviceId, quantity }) {
    const [cart] = await models.Cart.findOrCreate({
      where: { userId },
      defaults: {
        userId,
      },
    });

    const cartItem = await models.CartItem.create({
      deviceId,
      quantity,
      cartId: cart.id,
    });

    return cartItem;
  },
  async getDeviceFromCartByUserId(userId) {
    const cart = await models.Cart.findOne({ where: { userId } });

    const devices = await models.Device.findAll({
      attributes: {
        exclude: ['quantity'],
      },
      include: [
        {
          model: models.CartItem,
          where: { cartId: cart.id },
          attributes: ['quantity'],
          as: 'cart',
        },
      ],
    });

    return devices;
  },
  removeFromCartByDeviceId(deviceId) {
    return models.CartItem.destroy({ where: { deviceId } });
  },
};

export default CartService;
