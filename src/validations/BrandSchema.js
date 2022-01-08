import { VALIDATION_SCHEMA_ERRORS } from './schema_errors';

export const addBrandSchema = {
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        brand: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
          },
        },
      },
    },
    ...VALIDATION_SCHEMA_ERRORS,
  },
};

export const getBrandsSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        brands: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
      },
    },
    ...VALIDATION_SCHEMA_ERRORS,
  },
};

export const deleteBrandsByIdSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    ...VALIDATION_SCHEMA_ERRORS,
  },
};

export const brandsParamsSchema = {
  type: 'object',
  required: ['brandId'],
  properties: {
    brandId: { type: 'number' },
  },
};
