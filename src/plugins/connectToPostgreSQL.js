import { sequelize } from '../database';

async function connectToPostgreSQL(fastify, options = {}) {
  try {
    await sequelize.authenticate();

    fastify.log.info('Connected to PostgreSQL successfully.');
  } catch (err) {
    fastify.log.error(err);
  }
}

export default connectToPostgreSQL;
