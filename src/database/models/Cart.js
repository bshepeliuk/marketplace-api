import { Model } from 'sequelize';

const Cart = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      Cart.hasMany(models.CartItem, { foreignKey: 'cartId' });
    }
  }

  Cart.init(
    {
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Cart',
    }
  );
  return Cart;
};

export default Cart;
