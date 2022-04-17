const deserializeObject = (obj) => {
  const [key, value] = obj.split(':');
  return { [key]: value };
};

export default deserializeObject;
