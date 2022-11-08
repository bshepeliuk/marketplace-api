const prepareCustomersStats = ({ map, device, order, orderDevice }) => {
  const { price } = device;
  const { fullName } = order;
  const { quantity } = orderDevice;

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
};

export default prepareCustomersStats;
