import TypeService from '../services/TypeService';

const replaceTypeIdsWithLabel = async (items) => {
  const types = await TypeService.findAll({
    ids: items.map((item) => item.typeId),
  });
  const categories = types.map((type) => {
    const typeStats = items.find((item) => item.typeId === type.id);

    return {
      ...typeStats,
      name: type.name,
    };
  });

  return categories;
};

export default replaceTypeIdsWithLabel;
