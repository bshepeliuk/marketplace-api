const prepareOrderStats = (orders) => {
  const map = new Map(getInitialMapValues());

  for (const order of orders) {
    for (const device of order.devices) {
      prepareDevicesStats({
        device,
        map: map.get('devices'),
        order: device.orderDevice,
      });

      prepareStatusesStats({
        device,
        map: map.get('statuses'),
        order: device.orderDevice,
      });

      prepareCustomersStats({
        device,
        order,
        map: map.get('customers'),
        orderDevice: device.orderDevice,
      });

      prepareCategoriesStats({
        device,
        orderDevice: device.orderDevice,
        map: map.get('categories'),
      });

      prepareDayMonthStats({
        device,
        order,
        orderDevice: device.orderDevice,
        map: map.get('months'),
      });

      prepareDayTimeStats({
        device,
        order,
        orderDevice: device.orderDevice,
        map: map.get('time'),
      });

      prepareCitiesStats({
        device,
        order,
        orderDevice: device.orderDevice,
        map: map.get('cities'),
      });
    }
  }

  const result = Array.from(map.entries()).reduce(
    (prev, [mapKey, mapValue]) => ({
      ...prev,
      [mapKey]:
        mapKey === 'months' || mapKey === 'time'
          ? Array.from(mapValue.entries())
          : Array.from(mapValue.values()),
    }),
    {}
  );

  return {
    ...result,
    months: replaceDayAndMonthIdxWithLabels(result.months),
    time: replaceDayIdxWithLabel(result.time),
  };
};

const getInitialMapValues = () => {
  return [
    ['devices', new Map()],
    ['statuses', new Map()],
    ['categories', new Map()],
    ['customers', new Map()],
    ['cities', new Map()],
    ['time', new Map(getTimeInitValues())],
    ['months', new Map(getMonthInitialValue())],
  ];
};

const getTimeInitValues = () => {
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

const getMonthInitialValue = () => {
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
    weekdays[dayIdx - 1],
    dayData.map((data) => ({
      ...data,
      month: months[data.month - 1],
    })),
  ]);

  return Object.fromEntries(result);
};

const replaceDayIdxWithLabel = (dayTimeStats) => {
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

  return Object.fromEntries(result);
};

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

const prepareCategoriesStats = ({ map, device, orderDevice }) => {
  const { price, typeId } = device;
  const { quantity } = orderDevice;

  const totalPrice = map.has(typeId) ? map.get(typeId).total + price : price;
  const totalQuantity = map.has(typeId)
    ? map.get(typeId).quantity + quantity
    : quantity;

  map.set(typeId, {
    typeId,
    total: totalPrice,
    quantity: totalQuantity,
  });
};

const prepareDevicesStats = ({ map, device, order }) => {
  const { name } = device;
  const { quantity } = order;

  const totalQuantity = map.has(name)
    ? map.get(name).quantity + quantity
    : quantity;

  map.set(name, { name, quantity: totalQuantity });
};

const prepareStatusesStats = ({ map, device, order }) => {
  const { price } = device;
  const { quantity, status } = order;

  const total = map.has(status)
    ? map.get(status).total + price * quantity
    : price * quantity;

  map.set(status, { total, status });
};

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

export default prepareOrderStats;
