import { Model } from 'sequelize';

const Rating = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.User, { foreignKey: 'userId' });
      Rating.belongsTo(models.Device, {
        foreignKey: 'deviceId',
      });
    }
  }

  Rating.init(
    {
      rate: DataTypes.INTEGER,
      deviceId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Rating',
    }
  );
  return Rating;
};

export default Rating;
