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

export default replaceDayAndMonthIdxWithLabels;
