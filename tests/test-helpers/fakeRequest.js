export const fakeRequest = {
  app: null,
  init(app) {
    this.app = app;
  },
  // auth API
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
  logout(cookie = null) {
    return this.app.inject({
      method: 'POST',
      url: '/api/auth/logout',
      headers: {
        cookie,
      },
    });
  },
  // cart API
  addToCart({ cookie = null, body = {} }) {
    return this.app.inject({
      method: 'POST',
      url: '/api/cart',
      payload: body,
      headers: {
        cookie,
      },
    });
  },
  getDevicesFromCart({ cookie = null }) {
    return this.app.inject({
      method: 'GET',
      url: '/api/cart/items',
      headers: {
        cookie,
      },
    });
  },
  removeFromCartByDeviceId({ deviceId, cookie = null }) {
    return this.app.inject({
      method: 'DELETE',
      url: `/api/cart/${deviceId}`,
      headers: {
        cookie,
      },
    });
  },
};
