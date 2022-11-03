export const convertListToObjectByOptions = ({ data, key, value }) => {
  return data.reduce(
    (acc, current) => ({
      ...acc,
      [current[key]]: current[value],
    }),
    {}
  );
};
