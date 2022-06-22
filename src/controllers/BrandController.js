import BrandService from '../services/BrandService';

export const add = async (req, res) => {
  const { name } = req.body;

  const brand = await BrandService.create({ name });

  res.status(200).send({ brand });
};

export const getAll = async (req, res) => {
  const { name } = req.query;

  const filters = {
    name,
  };

  const brands = await BrandService.findAll(filters);

  res.status(200).send({ brands });
};

export const deleteById = async (req, res) => {
  const { brandId } = req.params;

  BrandService.destroyById(brandId);

  res.status(200).send({ message: 'Brand deleted successfully!!!' });
};
