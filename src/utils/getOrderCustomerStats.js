const getOrderCustomerStats = (orders) => {
  const map = new Map();

  for (const order of orders) {
    const { fullName } = order;

    for (const device of order.devices) {
      const { price } = device;
      const { quantity } = device.orderDevice;

      const totalPrice = map.has(fullName)
        ? map.get(fullName).total + price
        : price;
      const totalQuantity = map.has(fullName)
        ? map.get(fullName).quantity + quantity
        : quantity;

      map.set(fullName, {
        fullName,
        total: totalPrice,
        quantity: totalQuantity,
      });
    }
  }

  return Array.from(map.values());
};

export default getOrderCustomerStats;
