export const fakeAuthRequest = {
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
};

export const fakeCartRequest = {
  app: null,
  init(app) {
    this.app = app;
  },
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

export const fakeBrandRequest = {
  app: null,
  init(app) {
    this.app = app;
  },
  addNewBrand({ body = {}, cookie = null }) {
    return this.app.inject({
      method: 'POST',
      url: '/api/brands',
      payload: body,
      headers: {
        cookie,
      },
    });
  },
  deleteBrandById({ brandId, cookie = null }) {
    return this.app.inject({
      method: 'DELETE',
      url: `/api/brands/${brandId}`,
      headers: {
        cookie,
      },
    });
  },
  getAllBrands(cookie = null) {
    return this.app.inject({
      method: 'GET',
      url: '/api/brands',
      headers: {
        cookie,
      },
    });
  },
};

export const fakeTypeRequest = {
  app: null,
  init(app) {
    this.app = app;
  },
  addNewType({ body = {}, cookie = null }) {
    return this.app.inject({
      method: 'POST',
      url: '/api/types',
      payload: body,
      headers: {
        cookie,
      },
    });
  },
  getAllTypes(cookie = null) {
    return this.app.inject({
      method: 'GET',
      url: '/api/types',
      headers: {
        cookie,
      },
    });
  },
  deleteTypeById({ typeId, cookie = null }) {
    return this.app.inject({
      method: 'DELETE',
      url: `/api/brands/${typeId}`,
      headers: {
        cookie,
      },
    });
  },
};

export const fakeDeviceRequest = {
  app: null,
  init(app) {
    this.app = app;
  },
  addDevice({ cookie = null, body = {} }) {
    return this.app.inject({
      method: 'POST',
      url: `/api/devices`,
      payload: body,
      headers: {
        cookie,
      },
    });
  },
  getDeviceById({ cookie = null, deviceId = '' }) {
    return this.app.inject({
      method: 'GET',
      url: `/api/devices/${deviceId}`,
      headers: {
        cookie,
      },
    });
  },
  getAllDevice({ cookie = null }) {
    return this.app.inject({
      method: 'GET',
      url: `/api/devices`,
      headers: {
        cookie,
      },
    });
  },
};

export const fakeRequestInitialization = (appInstance) => {
  if (!appInstance) {
    throw new Error('Fastify instance should be provided for fake requests.');
  }

  const fakeRequestList = [
    fakeAuthRequest,
    fakeBrandRequest,
    fakeCartRequest,
    fakeDeviceRequest,
    fakeTypeRequest,
  ];

  fakeRequestList.forEach((item) => {
    item.init(appInstance);
  });
};
