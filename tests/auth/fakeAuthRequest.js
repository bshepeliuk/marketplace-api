const fakeAuthRequest = {
  app: null,
  init(app) {
    this.app = app;
  },
  register(body = {}) {
    return this.app.inject({
      method: 'POST',
      url: '/api/auth/register',
      payload: body,
    });
  },
  login(body = {}) {
    return this.app.inject({
      method: 'POST',
      url: '/api/auth/login',
      payload: body,
    });
  },
  logout(Cookie = null) {
    return this.app.inject({
      method: 'POST',
      url: '/api/auth/logout',
      headers: {
        Cookie,
      },
    });
  },
};

export default fakeAuthRequest;
