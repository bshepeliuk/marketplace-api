import { VALIDATION_SCHEMA_ERRORS } from './schema_errors';

export const DeviceDetailsSchema = {
  images: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        url: { type: 'string' },
        deviceId: { type: 'number' },
        preview: { type: 'boolean' },
        createdAt: { type: 'string' },
      },
    },
  },
  info: {
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
  ratings: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        userId: { type: 'number' },
        deviceId: { type: 'number' },
        rate: { type: 'number' },
      },
    },
  },
  comments: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        fullName: { type: 'string' },
        deviceId: { type: 'number' },
        body: { type: 'string' },
        parentId: {
          type: ['number', 'null'],
        },
        repliesCount: { type: ['number'] },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    },
  },
};

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
            userId: { type: 'number' },
            quantity: { type: 'number' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
            ...DeviceDetailsSchema,
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
              userId: { type: 'number' },
              quantity: { type: 'number' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
              ...DeviceDetailsSchema,
            },
          },
        },
        count: {
          type: 'number',
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

export const devicesParamsSchema = {
  type: 'object',
  properties: {
    limit: { type: 'number' },
    offset: { type: 'number' },
    categoryId: { type: 'number' },
  },
};
