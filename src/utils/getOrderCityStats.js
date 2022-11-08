const getOrderCityStats = (orders) => {
  const map = new Map();

  for (const order of orders) {
    const { address } = order;

    for (const device of order.devices) {
      const { price } = device;
      const { quantity } = device.orderDevice;

      const totalPrice = map.has(address.city)
        ? map.get(address.city).total + price
        : price;
      const totalQuantity = map.has(address.city)
        ? map.get(address.city).quantity + quantity
        : quantity;

      map.set(address.city, {
        city: address.city,
        total: totalPrice,
        quantity: totalQuantity,
      });
    }
  }

  return Array.from(map.values());
};

export default getOrderCityStats;
