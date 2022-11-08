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

export default replaceDayIdxWithLabel;
