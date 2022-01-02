function destroyAuthSession(req) {
  return new Promise((resolve, reject) => {
    req.sessionStore.destroy(req.session.sessionId, (error) => {
      if (error) return reject(error);

      req.session = null;
      resolve();
    });
  });
}

export default destroyAuthSession;
