import { VALIDATION_SCHEMA_ERRORS } from './schema_errors';

export const addDeviceSchema = {
  body: {
    type: 'object',
    required: ['name', 'price', 'brandId', 'typeId', 'quantity'],
    properties: {
      name: { type: 'string' },
      price: { type: 'number' },
      brandId: { type: 'number' },
      typeId: { type: 'number' },
      quantity: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        device: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            price: { type: 'number' },
            brandId: { type: 'number' },
            typeId: { type: 'number' },
            quantity: { type: 'number' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
      },
    },
    ...VALIDATION_SCHEMA_ERRORS,
  },
};

export const getDeviceSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        device: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            price: { type: 'number' },
            brandId: { type: 'number' },
            typeId: { type: 'number' },
            quantity: { type: 'number' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
      },
    },
    ...VALIDATION_SCHEMA_ERRORS,
  },
};

export const getDevicesSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        devices: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              price: { type: 'number' },
              brandId: { type: 'number' },
              typeId: { type: 'number' },
              quantity: { type: 'number' },
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

export const deviceParamsSchema = {
  type: 'object',
  required: ['deviceId'],
  properties: {
    deviceId: { type: 'number' },
  },
};
