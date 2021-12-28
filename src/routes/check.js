const checkOptions = {
  handler: (req, res) => {
    res.send({ message: 'world' });
  },
  config: {
    roles: ['SELLER'],
  },
};

const checkRoutes = async (fastify) => {
  fastify.get('/api/hello', checkOptions);
};

export default checkRoutes;
