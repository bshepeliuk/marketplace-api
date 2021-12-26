const checkRoutes = async (fastify) => {
  fastify.get('/api/hello', (req, res) => {
    res.send({ message: 'world' });
  });
};

export default checkRoutes;
