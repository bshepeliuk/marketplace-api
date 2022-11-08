const prepareOrderDayMonthStats = (orders) => {
  const initialValue = getInitialValue();

  if (orders === undefined) return initialValue;

  const calculatedStats = calculateDayMonthStats({ initialValue, orders });
  const result = replaceDayAndMonthIdxWithLabels(calculatedStats);

  return Object.fromEntries(result);
};

const getInitialValue = () => {
  const daysOfWeek = 7;
  const monthsOfYear = 12;

  const initialValue = Array.from({
    length: daysOfWeek,
  }).map((_, dayIdx) => [
    dayIdx + 1,
    Array.from({ length: monthsOfYear }).map((_, monthIdx) => ({
      month: monthIdx + 1,
      total: 0,
      quantity: 0,
      index: 1,
    })),
  ]);

  return initialValue;
};

const calculateDayMonthStats = ({ orders, initialValue }) => {
  const map = new Map(initialValue);

  for (const order of orders) {
    const { createdAt } = order;

    const day = new Date(createdAt).getDay() + 1;
    const month = new Date(createdAt).getMonth() + 1;

    for (const device of order.devices) {
      const { price } = device;
      const { quantity } = device.orderDevice;

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
    }
  }

  return Array.from(map);
};

const replaceDayAndMonthIdxWithLabels = (items) => {
  const weekdays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const result = items.map(([dayIdx, dayData]) => [
    [weekdays[dayIdx - 1]],
    dayData.map((data) => ({
      ...data,
      month: months[data.month - 1],
    })),
  ]);

  return result;
};

export default prepareOrderDayMonthStats;
