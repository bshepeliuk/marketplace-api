import { Model } from 'sequelize';

const Comments = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      Comments.belongsTo(models.Device, {
        foreignKey: 'deviceId',
        as: 'comments',
      });
    }
  }

  Comments.init(
    {
      deviceId: DataTypes.INTEGER,
      body: DataTypes.STRING,
      fullName: DataTypes.STRING,
      parentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comments',
    }
  );
  return Comments;
};

export default Comments;
