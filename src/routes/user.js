const userRoutes = async (fastify) => {
  fastify.get('/api/user', (req, res) => {
    res.send({ message: 'user' });
  });
};

export default userRoutes;
