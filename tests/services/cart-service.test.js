import CartService from '../../src/services/CartService';
import DeviceService from '../../src/services/DeviceService';
import UserService from '../../src/services/UserService';
import { createDevice } from '../test-helpers/createDevice';
import { createUser } from '../test-helpers/createUser';

describe('CartService', () => {
  let user = null;
  let device = null;

  beforeAll(async () => {
    user = await createUser();
    device = await createDevice();
  });

  afterAll(async () => {
    await UserService.removeAllUsers();
    await DeviceService.destroyById(device.id);

    user = null;
    device = null;
  });

  test('add to cart', async () => {
    const cart = await CartService.addToCart({
      userId: user.id,
      deviceId: device.id,
      quantity: 1,
    });

    expect(cart).toHaveProperty('cartId');
    expect(cart).toHaveProperty('id');
    expect(cart).toHaveProperty('deviceId');
    expect(cart).toHaveProperty('quantity');
    expect(cart.quantity).toBe(1);
    expect(cart.deviceId).toBe(device.id);
  });

  test('should have one item in cart', async () => {
    const devices = await CartService.getDeviceFromCartByUserId(user.id);
    const device = devices[0];

    expect(devices.length).toBe(1);
    expect(device).toHaveProperty('id');
    expect(device).toHaveProperty('price');
    expect(device).toHaveProperty('name');
    expect(device).toHaveProperty('quantity');
    expect(device).toHaveProperty('typeId');
    expect(device).toHaveProperty('brandId');
  });

  test('should not have any items in cart', async () => {
    await DeviceService.destroyById(device.id);
    const devices = await CartService.getDeviceFromCartByUserId(user.id);

    expect(devices.length).toBe(0);
  });
});
