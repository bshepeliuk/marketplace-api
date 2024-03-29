import { Model } from 'sequelize';

const Device = (sequelize, DataTypes) => {
  class Device extends Model {
    static associate(models) {
      Device.hasMany(models.CartItem, { foreignKey: 'deviceId', as: 'cart' });
      Device.hasMany(models.DeviceInfo, { foreignKey: 'deviceId', as: 'info' });
      Device.hasMany(models.Rating, { foreignKey: 'deviceId', as: 'ratings' });
      Device.hasMany(models.DeviceImage, {
        foreignKey: 'deviceId',
        as: 'images',
      });

      Device.hasMany(models.Comments, {
        foreignKey: 'deviceId',
        as: 'comments',
      });

      Device.belongsTo(models.Brand, { foreignKey: 'brandId' });
      Device.belongsTo(models.Type, { foreignKey: 'typeId' });
      Device.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'devices',
      });

      Device.belongsToMany(models.Order, {
        foreignKey: 'deviceId',
        through: 'OrderDevices',
        as: 'orders',
      });
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
