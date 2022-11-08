import { Model } from 'sequelize';

const DeviceImage = (sequelize, DataTypes) => {
  class DeviceImage extends Model {
    static associate(models) {
      DeviceImage.belongsTo(models.Device, {
        foreignKey: 'deviceId',
        as: 'images',
      });
    }
  }

  DeviceImage.init(
    {
      url: DataTypes.STRING,
      deviceId: DataTypes.INTEGER,
      preview: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'DeviceImage',
    }
  );
  return DeviceImage;
};

export default DeviceImage;
