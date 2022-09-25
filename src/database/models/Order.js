import { Model } from 'sequelize';

const Order = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasOne(models.ShippingAddress, {
        foreignKey: 'orderId',
        as: 'address',
      });
      Order.belongsToMany(models.Device, {
        foreignKey: 'orderId',
        through: 'OrderDevices',
        as: 'devices',
      });
    }
  }

  Order.init(
    {
      userId: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM,
        values: [
          'PROCESSING',
          'IN PROGRESS',
          'PAID',
          'UNPAID',
          'DELIVERED',
          'SHIPPED',
          'UNSHIPPED',
          'REJECTED',
          'COMPLETED',
          'REFUNDED',
        ],
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};

export default Order;
