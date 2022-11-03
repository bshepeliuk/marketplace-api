import { namesOfTypes } from './data/types';
import { namesOfBrands } from './data/brands';
import { laptops } from './data/laptops';
import { phones } from './data/phones';
import { tablets } from './data/tablets';
import { tvs } from './data/tvs';

import createUsers from './createUsers';
import createOrders from './createOrders';
import createOrderDevices from './createOrderDevices';
import createShippingAddresses from './createShippingAddresses';
import createTypes from './createTypes';
import createBrands from './createBrands';
import createDevices from './createDevices';
import createDeviceImages from './createDeviceImages';
import { createDeviceRatings } from './createRatings';
import { laptopDetails } from './data/laptopsDetails';
import { createDeviceDetails } from './createDeviceDetails';
import { tabletDetails } from './data/tabletDetails';
import { phoneDetails } from './data/phoneDetails';
import { tvDetails } from './data/tvDetails';
import { cameras } from './data/cameras';
import { cameraDetails } from './data/cameraDetails';
import { USER_ROLES } from './data/roles';

const types = createTypes(namesOfTypes);
const brands = createBrands(namesOfBrands);
const devices = createDevices({
  types,
  brands,
  mockValues: {
    tablets,
    phones,
    cameras,
    laptops,
    TVs: tvs,
  },
});
const images = createDeviceImages({
  devices,
  mockValues: {
    tablets,
    phones,
    laptops,
    cameras,
    TVs: tvs,
  },
});

const users = createUsers();

const buyers = users.filter((user) => user.role === USER_ROLES.buyer);

const orders = createOrders({
  buyers,
  count: 60,
});
const shippingAddresses = createShippingAddresses({ orders });
const orderDevices = createOrderDevices({
  orders,
  devices: devices.slice(0, 40),
  count: 2,
});

const ratings = createDeviceRatings({
  deviceIds: devices.map((item) => item.id),
  userIds: users.filter((user) => user.role === 'BUYER').map((item) => item.id),
});

const details = createDeviceDetails({
  types,
  devices,
  details: {
    laptops: laptopDetails,
    tablets: tabletDetails,
    phones: phoneDetails,
    cameras: cameraDetails,
    TVs: tvDetails,
  },
});

export {
  details,
  ratings,
  users,
  orders,
  orderDevices,
  shippingAddresses,
  devices,
  types,
  brands,
  images,
};
