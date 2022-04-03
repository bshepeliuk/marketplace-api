import { VALIDATION_SCHEMA_ERRORS } from './schema_errors';

export const getDeviceFilterSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        options: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              typeId: { type: 'number' },
              title: { type: 'string' },
              description: { type: 'string' },
              deviceId: { type: 'number' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
        prices: {
          type: 'object',
          properties: {
            min: { type: 'number' },
            max: { type: 'number' },
          },
        },
      },
    },
    ...VALIDATION_SCHEMA_ERRORS,
  },
};

export const filterParamsSchema = {
  type: 'object',
  required: ['typeId'],
  properties: {
    typeId: { type: 'number' },
  },
};
