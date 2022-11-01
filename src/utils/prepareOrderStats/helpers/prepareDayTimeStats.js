const prepareDayTimeStats = ({ map, order, device, orderDevice }) => {
  const { createdAt } = order;
  const { price } = device;
  const { quantity } = orderDevice;

  const hour = new Date(createdAt).getHours() + 1;
  const day = new Date(createdAt).getDay() + 1;

  const result = map.get(day).map((item) => {
    if (item.hour === hour) {
      return {
        ...item,
        total: item.total + price,
        quantity: item.quantity + quantity,
      };
    }

    return item;
  });

  map.set(day, result);
};

export default prepareDayTimeStats;
