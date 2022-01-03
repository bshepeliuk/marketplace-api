import { Model } from 'sequelize';

const Rating = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.User);
      Rating.belongsTo(models.Device);
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
