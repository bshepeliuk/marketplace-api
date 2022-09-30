import {
  generateRandomDate,
  generateRandomInteger,
  getRandomFromList,
} from './helpers';

function createOrders({ count, buyers }) {
  const orders = [];

  for (let i = 1; i < count + 1; i++) {
    const user = getRandomFromList(buyers);
    const date = generateRandomDate({
      start: new Date(2022, 0, 1),
      end: new Date(),
    });
    const phone = generateRandomInteger({
      min: 380671111111,
      max: 380679999999,
    });

    orders.push({
      phone: `+${phone}`,
      id: i,
      userId: user.id,
      fullName: user.fullName,
      createdAt: date,
      updatedAt: date,
    });
  }

  return orders;
}

export default createOrders;
