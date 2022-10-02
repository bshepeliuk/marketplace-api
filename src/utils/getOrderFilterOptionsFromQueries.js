const getOrderFilterOptionsFromQueries = (queries) => {
  const orderFields = ['fullName', 'id', 'phone'];

  const result = Object.entries(queries).filter(([key]) => {
    return orderFields.includes(key);
  });

  if (result.length === 0) return undefined;

  return Object.fromEntries(result);
};

export default getOrderFilterOptionsFromQueries;
