import { Model } from 'sequelize';

const CartDevice = (sequelize, DataTypes) => {
  class CartDevice extends Model {
    static associate(models) {
      CartDevice.hasOne(models.Device);

      CartDevice.belongsTo(models.Cart);
    }
  }

  CartDevice.init(
    {
      cartId: DataTypes.INTEGER,
      deviceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'CartDevice',
    }
  );
  return CartDevice;
};

export default CartDevice;
