import { cities } from './data/cities';
import { generateRandomInteger } from './helpers/generateRandomInteger';
import { getRandomFromList } from './helpers/getRandomFromList';

function createShippingAddresses({ orders }) {
  const shippingAddresses = [];

  let id = 0;

  for (const order of orders) {
    const streetNumber = generateRandomInteger({
      min: 100,
      max: 1000,
    });
    const buildingNumber = generateRandomInteger({ min: 1, max: 100 });
    const postalCode = generateRandomInteger({ min: 10_000, max: 99_999 });
    const city = getRandomFromList(cities);

    const address = {
      city,
      id: ++id,
      country: 'UA',
      line1: `Independent street ${streetNumber}`,
      line2: `building ${buildingNumber}`,
      postal_code: postalCode,
      state: `${city} region`,
      orderId: order.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    shippingAddresses.push(address);
  }

  return shippingAddresses;
}

export default createShippingAddresses;
