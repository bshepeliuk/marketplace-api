const groupDevicesByTypeId = (devices) => {
  const map = new Map();

  for (const device of devices) {
    const ids = map.has(device.typeId)
      ? Array.from(map.get(device.typeId))
      : [];

    map.set(device.typeId, ids.concat(device.id));
  }

  return Object.fromEntries(Array.from(map.entries()));
};

export default groupDevicesByTypeId;
