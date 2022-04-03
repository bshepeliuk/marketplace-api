const getUniqueObjFromArrayByKey = (data, key) => {
  const result = new Map();

  for (const item of data) {
    if (!result.has(item[key])) result.set(item[key], item);
  }

  return Array.from(result.values());
};

export default getUniqueObjFromArrayByKey;
