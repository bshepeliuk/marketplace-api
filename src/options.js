export const FASTIFY_OPTIONS = {
  logger: {
    prettyPrint: true,
  },
};

export const SWAGGER_OPTIONS = {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'API' },
  },
};
