export const namesOfTypes = [
  'laptops',
  'tablets',
  'phones',
  'TVs',
  'cameras',
  'test-type',
];

export const typesByName = namesOfTypes.reduce(
  (prev, current) => ({ ...prev, [current.toLowerCase()]: current }),
  {}
);
