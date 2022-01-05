import { Model } from 'sequelize';

const OrderItem = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      OrderItem.belongsTo(models.Order, { foreignKey: 'orderId' });
    }
  }
  OrderItem.init(
    {
      orderId: DataTypes.INTEGER,
      deviceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'OrderItem',
    }
  );
  return OrderItem;
};

export default OrderItem;
