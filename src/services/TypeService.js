import sequelize from 'sequelize';
import models from '../database';

const TypeService = {
  create({ name }) {
    return models.Type.create({ name });
  },
  findAll(filters) {
    let where = {};

    if (filters.name !== undefined) {
      where = {
        name: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('name')),
          'LIKE',
          `%${filters.name.toLowerCase()}%`
        ),
      };
    }

    if (filters.ids !== undefined) {
      where = { ...where, id: filters.ids };
    }

    return models.Type.findAll({ where, raw: true });
  },
  destroyById(typeId) {
    return models.Type.destroy({ where: { id: typeId } });
  },
};

export default TypeService;
