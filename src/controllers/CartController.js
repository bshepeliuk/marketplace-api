import CartService from '../services/CartService';

export const addToCart = async (req, res) => {
  const { deviceId, quantity } = req.body;
  const { userId } = req.session.current;

  const cart = await CartService.addToCart({ userId, deviceId, quantity });

  res.status(200).send({ cart });
};

export const removeFromCart = async (req, res) => {
  const { deviceId } = req.params;

  await CartService.removeFromCartByDeviceId(deviceId);

  res.status(200).send({
    message: 'Deleted.',
  });
};

export const getDevicesFromCart = async (req, res) => {
  const { userId } = req.session.current;

  const devices = await CartService.getDeviceFromCartByUserId(userId);

  res.status(200).send({ cart: { devices } });
};
