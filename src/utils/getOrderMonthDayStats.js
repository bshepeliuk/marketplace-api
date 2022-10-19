const getOrderMonthDayStats = (orders) => {
  const map = new Map();

  for (const order of orders) {
    const { createdAt } = order;

    for (const device of order.devices) {
      const { price } = device;
      const { quantity } = device.orderDevice;

      const monthIdx = new Date(createdAt).getMonth();
      const dayIdx = new Date(createdAt).getDay();
      const year = new Date(createdAt).getFullYear();

      const fullDate = `${year}-${monthIdx + 1}-${dayIdx + 1}`;

      const totalPrice = map.has(fullDate)
        ? map.get(fullDate).total + price
        : price;
      const totalQuantity = map.has(fullDate)
        ? map.get(fullDate).quantity + quantity
        : quantity;

      map.set(fullDate, {
        fullDate,
        total: totalPrice,
        quantity: totalQuantity,
      });
    }
  }

  return Array.from(map.values());
};

export default getOrderMonthDayStats;
