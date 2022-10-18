const getOrderStatusStats = (orders) => {
  const map = new Map();

  for (const order of orders) {
    for (const device of order.devices) {
      const { price } = device;
      const { status, quantity } = device.orderDevice;

      const total = map.has(status)
        ? map.get(status).total + price * quantity
        : price * quantity;

      map.set(status, { total, status });
    }
  }

  return Array.from(map.values());
};

export default getOrderStatusStats;
