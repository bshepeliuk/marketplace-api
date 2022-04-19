function splitObjOnKeysAndValuesTuple(data = []) {
  return data.reduce((acc, current) => {
    const [key, value] = Object.entries(current).flat(1);
    return [(acc[0] || []).concat(key), (acc[1] || []).concat(value)];
  }, []);
}

export default splitObjOnKeysAndValuesTuple;
