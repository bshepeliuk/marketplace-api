import { Model } from 'sequelize';

const CartDevice = (sequelize, DataTypes) => {
  class CartDevice extends Model {
    static associate(models) {
      CartDevice.belongsTo(models.Cart, { foreignKey: 'cartId' });
      CartDevice.belongsTo(models.Device, { foreignKey: 'deviceId' });
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
