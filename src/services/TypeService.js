import models from '../database';

const TypeService = {
  create({ name }) {
    return models.Type.create({ name });
  },
  findAll() {
    return models.Type.findAll();
  },
  destroyById(typeId) {
    return models.Type.destroy({ where: { id: typeId } });
  },
};

export default TypeService;
