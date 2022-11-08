const prepareOrderDayTimeStats = (orders) => {
  const initialValue = getInitValues();
  const dayTimeStats = calculateDayTimeStats({ orders, initialValue });
  const result = replaceDayNumberWithNumber(dayTimeStats);

  return Object.fromEntries(result);
};

const getInitValues = () => {
  const weekdays = 7;
  const hours = 24;

  const initialValue = Array.from({ length: weekdays }).map((_, weekdayIdx) => [
    weekdayIdx + 1,
    Array.from({ length: hours }).map((_, hourIdx) => ({
      hour: hourIdx + 1,
      total: 0,
      quantity: 0,
      index: 1,
    })),
  ]);

  return initialValue;
};

const calculateDayTimeStats = ({ orders, initialValue }) => {
  const map = new Map(initialValue);

  for (const order of orders) {
    const { createdAt } = order;

    const hour = new Date(createdAt).getHours() + 1;
    const day = new Date(createdAt).getDay() + 1;

    for (const device of order.devices) {
      const { price } = device;
      const { quantity } = device.orderDevice;

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
    }
  }

  return Array.from(map);
};

const replaceDayNumberWithNumber = (dayTimeStats) => {
  const weekdayLabels = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  const result = dayTimeStats.map(([day, dayData]) => [
    weekdayLabels[day - 1],
    dayData,
  ]);

  return result;
};

export default prepareOrderDayTimeStats;
