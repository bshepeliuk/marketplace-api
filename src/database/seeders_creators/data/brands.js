export const namesOfBrands = [
  'ASUS',
  'HP',
  'APPLE',
  'DELL',
  'LENOVO',
  'ACER',
  'SAMSUNG',
  'HUAWEI',
  'MICROSOFT',
  'XIAOMI',
  'TEST-BRAND',
  'CANON',
  'NIKON',
];

export const brandsByName = namesOfBrands.reduce(
  (prev, current) => ({ ...prev, [current.toLowerCase()]: current }),
  {}
);
