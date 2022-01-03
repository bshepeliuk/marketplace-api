import { Model } from 'sequelize';

const DeviceInfo = (sequelize, DataTypes) => {
  class DeviceInfo extends Model {
    static associate(models) {
      DeviceInfo.belongsTo(models.Device);
    }
  }

  DeviceInfo.init(
    {
      deviceId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'DeviceInfo',
    }
  );
  return DeviceInfo;
};

export default DeviceInfo;
