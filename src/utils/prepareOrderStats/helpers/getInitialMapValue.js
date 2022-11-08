const getInitialMapValue = () => {
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

export default getInitialMapValue;
