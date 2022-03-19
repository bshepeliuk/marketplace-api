import * as TypeController from '../controllers/TypeController';
import * as validation from '../validations/TypeSchema';
import authGate from '../middlewares/authGate';

const addTypeOptions = {
  handler: TypeController.add,
  schema: validation.addTypeSchema,
  preHandler: authGate,
};

const getAllTypesOptions = {
  handler: TypeController.getAll,
  schema: validation.getTypesSchema,
};

const deleteTypesByIdOptions = {
  handler: TypeController.deleteById,
  schema: validation.deleteTypesByIdSchema,
  params: validation.typeParamsSchema,
  preHandler: authGate,
};

const typeRoutes = async (fastify) => {
  fastify.post('/api/types', addTypeOptions);
  fastify.get('/api/types', getAllTypesOptions);
  fastify.delete('/api/types/:typeId', deleteTypesByIdOptions);
};

export default typeRoutes;
