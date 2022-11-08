const prepareDayMonthStats = ({ map, order, device, orderDevice }) => {
  const { createdAt } = order;
  const { price } = device;
  const { quantity } = orderDevice;

  const day = new Date(createdAt).getDay() + 1;
  const month = new Date(createdAt).getMonth() + 1;

  const result = map.get(day).map((item) => {
    if (item.month === month) {
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

export default prepareDayMonthStats;
