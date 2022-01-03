import { Model } from 'sequelize';

const Cart = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.hasMany(models.CartDevice);

      Cart.belongsTo(models.User);
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
