import * as TypeController from '../controllers/TypeController';
import * as validation from '../validations/TypeSchema';

const addTypeOptions = {
  handler: TypeController.add,
  schema: validation.addTypeSchema,
};

const getAllTypesOptions = {
  handler: TypeController.getAll,
  schema: validation.getTypesSchema,
};

const deleteTypesByIdOptions = {
  handler: TypeController.deleteById,
  schema: validation.deleteTypesByIdSchema,
  params: validation.typeParamsSchema,
};

const typeRoutes = async (fastify) => {
  fastify.post('/api/types', addTypeOptions);
  fastify.get('/api/types', getAllTypesOptions);
  fastify.delete('/api/types/:typeId', deleteTypesByIdOptions);
};

export default typeRoutes;
