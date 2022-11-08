const getDeviceCategoryStats = (orders) => {
  const map = new Map();

  for (const order of orders) {
    for (const device of order.devices) {
      const { price, typeId } = device;
      const { quantity } = device.orderDevice;

      const totalPrice = map.has(typeId)
        ? map.get(typeId).total + price
        : price;
      const totalQuantity = map.has(typeId)
        ? map.get(typeId).quantity + quantity
        : quantity;

      map.set(typeId, { typeId, total: totalPrice, quantity: totalQuantity });
    }
  }

  return Array.from(map.values());
};

export default getDeviceCategoryStats;
