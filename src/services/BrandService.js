import sequelize from 'sequelize';
import models from '../database';

const BrandService = {
  create({ name }) {
    return models.Brand.create({ name });
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

    return models.Brand.findAll({ where });
  },
  destroyById(brandId) {
    return models.Brand.destroy({ where: { id: brandId } });
  },
};

export default BrandService;
