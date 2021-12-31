const startServer = async (app) => {
  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || '0.0.0.0';

  try {
    await app.listen(PORT, HOST);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

export default startServer;
