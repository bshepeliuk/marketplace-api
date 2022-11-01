const prepareCitiesStats = ({ map, order, device, orderDevice }) => {
  const { address } = order;
  const { price } = device;
  const { quantity } = orderDevice;

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
};

export default prepareCitiesStats;
