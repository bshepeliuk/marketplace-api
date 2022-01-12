import { Model } from 'sequelize';

const CartItem = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      CartItem.belongsTo(models.Cart, { foreignKey: 'cartId' });
      CartItem.belongsTo(models.Device, { foreignKey: 'deviceId', as: 'cart' });
    }
  }

  CartItem.init(
    {
      cartId: DataTypes.INTEGER,
      deviceId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'CartItem',
    }
  );
  return CartItem;
};

export default CartItem;
