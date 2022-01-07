import models from '../database';

const BrandService = {
  create({ name }) {
    return models.Brand.create({ name });
  },
};

export default BrandService;
