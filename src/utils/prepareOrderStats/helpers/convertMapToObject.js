const convertMapToObject = (map) => {
  return Array.from(map.entries()).reduce(
    (prev, [mapKey, mapValue]) => ({
      ...prev,
      [mapKey]:
        mapKey === 'months' || mapKey === 'time'
          ? Array.from(mapValue.entries())
          : Array.from(mapValue.values()),
    }),
    {}
  );
};

export default convertMapToObject;
