import Sequelize from 'sequelize';
import DATABASE_CONFIG from './config/database';
// models
import User from './models/User';

let sequelize;

if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize(DATABASE_CONFIG.development);
} else if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize(DATABASE_CONFIG.test);
} else if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

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
