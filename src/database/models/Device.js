import { Model } from 'sequelize';

const Device = (sequelize, DataTypes) => {
  class Device extends Model {
    static associate(models) {
      Device.hasMany(models.DeviceInfo, { as: 'info' });
      Device.hasMany(models.Rating);

      Device.belongsTo(models.CartDevice);
      Device.belongsTo(models.Brand);
      Device.belongsTo(models.Type);
    }
  }

  Device.init(
    {
      price: DataTypes.INTEGER,
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      typeId: DataTypes.INTEGER,
      brandId: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Device',
    }
  );
  return Device;
};

export default Device;
