export const generateRandomInteger = ({ min, max }) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomDate = ({ start, end }) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export const getBrandIdByDeviceTitle = ({ title, brands }) => {
  const brand = brands.find((brand) => {
    return title.toLowerCase().includes(brand.name.toLowerCase());
  });

  return brand.id;
};

export const attachBrandIdAndGetDevices = ({ items, brands }) => {
  return items.map((item) => ({
    ...item,
    brandId: getBrandIdByDeviceTitle({ title: item.name, brands }),
  }));
};

export const attachTypeIdAndGetDevices = ({ items, typeId }) => {
  return items.map((name) => ({ name, typeId }));
};

export const attachImgUrlToProperDeviceName = ({ items, images }) => {
  return items.map((name, idx) => [name, images[idx]]);
};

export const generateBrandsDataByNames = (namesOfBrands) => {
  let id = 0;
  const result = [];

  for (const name of namesOfBrands) {
    const date = generateRandomDate({
      start: new Date(2021, 0, 1),
      end: new Date(),
    });

    result.push({
      name,
      id: ++id,
      createdAt: date,
      updatedAt: date,
    });
  }

  return result;
};

export const generateTypesDataByNames = (namesOfTypes) => {
  let id = 0;
  const result = [];

  for (const name of namesOfTypes) {
    const date = generateRandomDate({
      start: new Date(2021, 0, 1),
      end: new Date(),
    });

    result.push({
      name,
      id: ++id,
      createdAt: date,
      updatedAt: date,
    });
  }

  return result;
};

export const generateDevicesWithFullInfo = (info) => {
  let id = 1;

  const result = [];

  for (const device of info) {
    const date = generateRandomDate({
      start: new Date(2021, 0, 1),
      end: new Date(),
    });

    result.push({
      ...device,
      id: id++,
      name: device.name,
      price: generateRandomInteger({ min: 10_000, max: 50_000 }),
      quantity: generateRandomInteger({ min: 1, max: 10 }),
      createdAt: date,
      updatedAt: date,
    });
  }

  return result;
};

export const attachImgUrlAndGetDeviceImgData = (devices, imagesTitle) => {
  const result = [];

  for (let idx = 0; idx < devices.length; idx++) {
    const date = generateRandomDate({
      start: new Date(2021, 0, 1),
      end: new Date(),
    });
    // TODO: compare names and attach url
    const { id } = devices[idx];

    const imgData = imagesTitle[idx];

    if (imgData) {
      result.push({
        url: imgData[1],
        id: idx,
        deviceId: id,
        createdAt: date,
        updatedAt: date,
      });
    }
  }

  return result;
};

export const matchNameToId = (data) => {
  return data.reduce(
    (acc, current) => ({ ...acc, [current.name]: current.id }),
    {}
  );
};

export const getAllDevicesByTypeId = ({ devices, typeId }) => {
  return devices.filter((device) => device.typeId === typeId);
};

export const getRandomFromList = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

export const generateDeviceDetails = ({ deviceIds, typeId, details }) => {
  let id = 1;

  const result = [];

  for (let idx = 0; idx < deviceIds.length; idx++) {
    for (const [title, descriptions] of details) {
      const date = generateRandomDate({
        start: new Date(2021, 0, 1),
        end: new Date(),
      });

      result.push({
        title,
        typeId,
        id: ++id,
        deviceId: deviceIds[idx],
        description: getRandomFromList(descriptions),
        createdAt: date,
        updatedAt: date,
      });
    }
  }

  return result;
};
