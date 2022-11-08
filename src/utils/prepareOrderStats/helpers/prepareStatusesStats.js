const prepareStatusesStats = ({ map, device, order }) => {
  const { price } = device;
  const { quantity, status } = order;

  const total = map.has(status)
    ? map.get(status).total + price * quantity
    : price * quantity;

  map.set(status, { total, status });
};

export default prepareStatusesStats;
