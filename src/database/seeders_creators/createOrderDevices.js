import {
  generateRandomDate,
  generateRandomInteger,
  getRandomFromList,
} from './helpers';

function createOrderDevices({ count, orders, devices }) {
  const orderDevices = [];

  for (const order of orders) {
    for (let i = 0; i < count; i++) {
      const date = generateRandomDate({
        start: new Date(2022, 0, 1),
        end: new Date(),
      });

      const quantity = generateRandomInteger({ min: 1, max: 4 });
      const device = getRandomFromList(devices);

      const orderDevice = {
        quantity,
        orderId: order.id,
        status: getRandomFromList(ORDER_STATUS),
        createdAt: date,
        updatedAt: date,
        deviceId: device.id,
      };

      orderDevices.push(orderDevice);
    }
  }

  return orderDevices;
}

const ORDER_STATUS = [
  'PROCESSING',
  'IN PROGRESS',
  'PAID',
  'UNPAID',
  'DELIVERED',
  'SHIPPED',
  'UNSHIPPED',
  'REJECTED',
  'COMPLETED',
  'REFUNDED',
];

export default createOrderDevices;
