import { VALIDATION_SCHEMA_ERRORS } from './schema_errors';

export const AddToCartSchema = {
  body: {
    type: 'object',
    required: ['deviceId', 'quantity'],
    properties: {
      deviceId: { type: 'number' },
      quantity: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        cart: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            cartId: { type: 'number' },
            deviceId: { type: 'number' },
            quantity: { type: 'number' },
          },
        },
      },
    },
    ...VALIDATION_SCHEMA_ERRORS,
  },
};
