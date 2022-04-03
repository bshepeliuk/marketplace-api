import * as FilterController from '../controllers/FilterController';
import * as validation from '../validations/FilterSchema';

const getDeviceFiltersByTypeIdOptions = {
  handler: FilterController.getDeviceFiltersByTypeId,
  schema: validation.getDeviceFilterSchema,
  params: validation.filterParamsSchema,
};

const filtersRoutes = async (fastify) => {
  fastify.get('/api/filters/:typeId', getDeviceFiltersByTypeIdOptions);
};

export default filtersRoutes;
