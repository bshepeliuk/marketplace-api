module.exports = {
  development: {
    username: 'bshepeliuk',
    password: 'bshepeliuk',
    database: 'dev-db',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: 'bshepeliuk',
    password: 'bshepeliuk',
    database: 'test-db',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
};
