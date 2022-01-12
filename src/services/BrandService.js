import models from '../database';

const BrandService = {
  create({ name }) {
    return models.Brand.create({ name });
  },
  findAll() {
    return models.Brand.findAll();
  },
  destroyById(brandId) {
    return models.Brand.destroy({ where: { id: brandId } });
  },
};

export default BrandService;
