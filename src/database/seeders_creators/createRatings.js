import { generateRandomDate } from './helpers/generateRandomDate';
import { generateRandomInteger } from './helpers/generateRandomInteger';
import { getRandomFromList } from './helpers/getRandomFromList';

export const createDeviceRatings = ({ deviceIds, userIds }) => {
  const date = generateRandomDate({
    start: new Date(2021, 0, 1),
    end: new Date(),
  });

  return deviceIds.map((deviceId, idx) => ({
    deviceId,
    userId: getRandomFromList(userIds),
    id: idx + 1,
    rate: generateRandomInteger({ min: 1, max: 5 }),
    createdAt: date,
    updatedAt: date,
  }));
};
