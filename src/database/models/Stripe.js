import { Model } from 'sequelize';

const Stripe = (sequelize, DataTypes) => {
  class Stripe extends Model {
    static associate(models) {
      Stripe.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }

  Stripe.init(
    {
      accountId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Stripe',
    }
  );
  return Stripe;
};

export default Stripe;
