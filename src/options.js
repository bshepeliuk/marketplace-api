export const FASTIFY_OPTIONS = {
  logger: {
    prettyPrint: {
      translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
    },
  },
};

export const SWAGGER_OPTIONS = {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'API' },
  },
};

export const sequelizeProductionOptions = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
