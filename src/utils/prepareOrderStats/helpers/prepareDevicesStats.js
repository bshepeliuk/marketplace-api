const prepareDevicesStats = ({ map, device, order }) => {
  const { name } = device;
  const { quantity } = order;

  const totalQuantity = map.has(name)
    ? map.get(name).quantity + quantity
    : quantity;

  map.set(name, { name, quantity: totalQuantity });
};

export default prepareDevicesStats;
