import Sequelize from 'sequelize';
import { sequelizeProductionOptions } from '../config/options';
import DATABASE_CONFIG from './config/database';
// models
import User from './models/User';
import Brand from './models/Brand';
import Cart from './models/Cart';
import CartDevice from './models/CartDevice';
import Device from './models/Device';
import DeviceInfo from './models/DeviceInfo';
import Rating from './models/Rating';
import Type from './models/Type';
import TypeBrand from './models/TypeBrand';

const sequelizeInstance = {
  development: () => new Sequelize(DATABASE_CONFIG.development),
  test: () => new Sequelize(DATABASE_CONFIG.test),
  production() {
    return new Sequelize(process.env.DATABASE_URL, sequelizeProductionOptions);
  },
};

const sequelize = sequelizeInstance[process.env.NODE_ENV]();

const models = {
  User: User(sequelize, Sequelize.DataTypes),
  Cart: Cart(sequelize, Sequelize.DataTypes),
  CartDevice: CartDevice(sequelize, Sequelize.DataTypes),
  Type: Type(sequelize, Sequelize.DataTypes),
  Device: Device(sequelize, Sequelize.DataTypes),
  DeviceInfo: DeviceInfo(sequelize, Sequelize.DataTypes),
  Brand: Brand(sequelize, Sequelize.DataTypes),
  Rating: Rating(sequelize, Sequelize.DataTypes),
  TypeBrand: TypeBrand(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;
