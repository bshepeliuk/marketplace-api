import models from '../database';

const TypeService = {
  create({ name }) {
    return models.Type.create({ name });
  },
};

export default TypeService;
