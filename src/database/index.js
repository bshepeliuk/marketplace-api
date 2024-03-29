import Sequelize from 'sequelize';
import { sequelizeProductionOptions } from '../config/options';
import DATABASE_CONFIG from './config/database';
// models
import User from './models/User';
import Brand from './models/Brand';
import Cart from './models/Cart';
import CartItem from './models/CartItem';
import Device from './models/Device';
import DeviceInfo from './models/DeviceInfo';
import Rating from './models/Rating';
import Type from './models/Type';
import TypeBrand from './models/TypeBrand';
import DeviceImage from './models/DeviceImage';
import Order from './models/Order';
import StripeModel from './models/Stripe';
import Comments from './models/Comments';
import OrderDevice from './models/OrderDevice';
import ShippingAddress from './models/ShippingAddress';

const sequelizeInstance = {
  development: () => new Sequelize(DATABASE_CONFIG.development),
  test: () => new Sequelize(DATABASE_CONFIG.test),
  production() {
    return new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: false,
        },
      },
    });
  },
};

const sequelize = sequelizeInstance[process.env.NODE_ENV]();

const models = {
  User: User(sequelize, Sequelize.DataTypes),
  Cart: Cart(sequelize, Sequelize.DataTypes),
  CartItem: CartItem(sequelize, Sequelize.DataTypes),
  Type: Type(sequelize, Sequelize.DataTypes),
  Device: Device(sequelize, Sequelize.DataTypes),
  DeviceInfo: DeviceInfo(sequelize, Sequelize.DataTypes),
  Brand: Brand(sequelize, Sequelize.DataTypes),
  Rating: Rating(sequelize, Sequelize.DataTypes),
  TypeBrand: TypeBrand(sequelize, Sequelize.DataTypes),
  DeviceImage: DeviceImage(sequelize, Sequelize.DataTypes),
  Order: Order(sequelize, Sequelize.DataTypes),
  Stripe: StripeModel(sequelize, Sequelize.DataTypes),
  Comments: Comments(sequelize, Sequelize.DataTypes),
  OrderDevice: OrderDevice(sequelize, Sequelize.DataTypes),
  ShippingAddress: ShippingAddress(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;
