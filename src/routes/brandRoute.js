import * as BrandController from '../controllers/BrandController';
import * as validation from '../validations/BrandSchema';

const addBrandOptions = {
  handler: BrandController.add,
  schema: validation.addBrandSchema,
};

const getAllBrandsOptions = {
  handler: BrandController.getAll,
  schema: validation.getBrandsSchema,
};

const deleteBrandByIdOptions = {
  handler: BrandController.deleteById,
  schema: validation.deleteBrandsByIdSchema,
  params: validation.brandsParamsSchema,
};

const brandRoutes = async (fastify) => {
  fastify.post('/api/brands', addBrandOptions);
  fastify.get('/api/brands', getAllBrandsOptions);
  fastify.delete('/api/brands/:brandId', deleteBrandByIdOptions);
};

export default brandRoutes;
