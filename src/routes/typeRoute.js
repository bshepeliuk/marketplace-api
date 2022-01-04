import * as TypeController from '../controllers/TypeController';

const addTypeOptions = {
  handler: TypeController.add,
};

const getAllTypesOptions = {
  handler: TypeController.getAll,
};

const typeRoutes = async (fastify) => {
  fastify.post('/api/type', addTypeOptions);
  fastify.get('/api/type', getAllTypesOptions);
};

export default typeRoutes;
