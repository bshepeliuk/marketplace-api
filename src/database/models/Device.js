import { Model } from 'sequelize';

const Device = (sequelize, DataTypes) => {
  class Device extends Model {
    static associate(models) {
      Device.hasMany(models.CartItem, { foreignKey: 'deviceId' });
      Device.hasMany(models.DeviceInfo, { foreignKey: 'deviceId', as: 'info' });
      Device.hasMany(models.Rating, { foreignKey: 'deviceId', as: 'ratings' });
      Device.hasMany(models.DeviceImage, {
        foreignKey: 'deviceId',
        as: 'images',
      });
      Device.hasMany(models.OrderItem, { foreignKey: 'deviceId' });

      Device.belongsTo(models.Brand, { foreignKey: 'brandId' });
      Device.belongsTo(models.Type, { foreignKey: 'typeId' });
    }
  }

  Device.init(
    {
      price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      name: DataTypes.STRING,
      typeId: DataTypes.INTEGER,
      brandId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Device',
    }
  );
  return Device;
};

export default Device;
