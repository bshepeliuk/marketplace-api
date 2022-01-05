import models from '../database';

export const addToCart = async (req, res) => {
  const { cartId, deviceId } = req.body;
  const cart = await models.CartItem.create({ cartId, deviceId });

  res.status(200).send({ cart });
};

export const removeFromCart = async (req, res) => {
  const { deviceId } = req.params;

  await models.CartItem.destroy({ where: { deviceId } });

  res.status(200).send({
    message: 'Deleted.',
  });
};

export const getDevicesFromCart = async (req, res) => {
  const { userId } = req.session.current; // TODO: method for get userId from session

  const cart = await models.User.findOne({
    where: { id: userId },
    include: {
      model: models.Cart,
    },
  });

  const devices = await models.Device.findAll({
    include: [
      {
        model: models.CartItem,
        where: { cartId: cart.id },
        attributes: [],
      },
    ],
  });

  res.status(200).send({ cart: { devices } });
};
