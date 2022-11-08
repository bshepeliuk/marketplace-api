const getOrderDeviceStats = (orders) => {
  const map = new Map();

  for (const order of orders) {
    for (const device of order.devices) {
      const { name } = device;
      const { quantity } = device.orderDevice;

      const total = map.has(name)
        ? map.get(name).quantity + quantity
        : quantity;

      map.set(name, { quantity: total, name });
    }
  }

  return Array.from(map.values());
};

export default getOrderDeviceStats;
