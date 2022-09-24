import { Model } from 'sequelize';

const OrderDevice = (sequelize, DataTypes) => {
  class OrderDevice extends Model {
    static associate(models) {
      OrderDevice.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'orders',
      });

      OrderDevice.belongsTo(models.Device, {
        foreignKey: 'deviceId',
        as: 'devices',
      });
    }
  }

  OrderDevice.init(
    {
      orderId: DataTypes.INTEGER,
      deviceId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
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
    },
    {
      sequelize,
      modelName: 'OrderDevice',
    }
  );
  return OrderDevice;
};

export default OrderDevice;
