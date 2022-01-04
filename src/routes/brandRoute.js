import * as BrandController from '../controllers/BrandController';

const addBrandOptions = {
  handler: BrandController.add,
};

const getAllBrandsOptions = {
  handler: BrandController.getAll,
};

const brandRoutes = async (fastify) => {
  fastify.post('/api/brand', addBrandOptions);
  fastify.get('/api/brand', getAllBrandsOptions);
};

export default brandRoutes;
