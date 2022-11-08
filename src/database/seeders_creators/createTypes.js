import { generateRandomDate } from './helpers/generateRandomDate';

const createTypes = (namesOfTypes) => {
  const types = namesOfTypes.map((name, idx) => {
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

  return types;
};

export default createTypes;
