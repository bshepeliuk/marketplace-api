import { Model } from 'sequelize';

const DeviceInfo = (sequelize, DataTypes) => {
  class DeviceInfo extends Model {
    static associate(models) {
      DeviceInfo.belongsTo(models.Device, {
        foreignKey: 'deviceId',
        as: 'info',
      });
    }
  }

  DeviceInfo.init(
    {
      deviceId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'DeviceInfo',
    }
  );
  return DeviceInfo;
};

export default DeviceInfo;
