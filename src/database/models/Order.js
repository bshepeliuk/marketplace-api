import { Model } from 'sequelize';

const Order = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });

      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'orders',
      });
    }
  }

  Order.init(
    {
      userId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};

export default Order;
