import { Model } from 'sequelize';

const ShippingAddress = (sequelize, DataTypes) => {
  class ShippingAddress extends Model {
    static associate(models) {
      ShippingAddress.belongsTo(models.Order, {
        foreignKey: 'orderId',
      });
    }
  }

  ShippingAddress.init(
    {
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      line1: DataTypes.STRING,
      line2: DataTypes.STRING,
      postal_code: DataTypes.STRING,
      state: DataTypes.STRING,
      orderId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ShippingAddress',
    }
  );
  return ShippingAddress;
};

export default ShippingAddress;
