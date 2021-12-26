import Sequelize from 'sequelize';
import { sequelizeProductionOptions } from '../options';
import DATABASE_CONFIG from './config/database';
// models
import User from './models/User';

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
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;
