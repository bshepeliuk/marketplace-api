import { generateRandomDate } from './helpers/generateRandomDate';

const createBrands = (namesOfBrands) => {
  const result = namesOfBrands.map((name, idx) => {
    const date = generateRandomDate({
      start: new Date(2021, 0, 1),
      end: new Date(),
    });

    return {
      name,
      id: idx + 1,
      createdAt: date,
      updatedAt: date,
    };
  });

  return result;
};

export default createBrands;
