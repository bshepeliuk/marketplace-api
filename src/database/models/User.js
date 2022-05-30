import { Model } from 'sequelize';

const User = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Rating, {
        foreignKey: 'userId',
        as: 'ratings',
      });
      User.hasOne(models.Cart, {
        foreignKey: 'userId',
      });
      User.hasOne(models.Stripe, {
        foreignKey: 'userId',
        as: 'stripe',
      });
      User.hasMany(models.Order, {
        foreignKey: 'userId',
        as: 'orders',
      });
      User.hasMany(models.Device, {
        foreignKey: 'userId',
        as: 'devices',
      });
    }
  }

  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: ['BUYER', 'SELLER'],
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};

export default User;
