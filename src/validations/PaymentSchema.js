import { VALIDATION_SCHEMA_ERRORS } from './schema_errors';

export const checkoutSessionSchema = {
  body: {
    type: 'object',
    required: ['items', 'customer'],
    properties: {
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            quantity: { type: 'number' },
            price_data: {
              type: 'object',
              items: {
                currency: {
                  type: 'string',
                  enum: ['USD'],
                },
                unit_amount: { type: 'number' },
              },
              product_data: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  images: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
      customer: {
        email: { type: 'string' },
        fullName: { type: 'string' },
        role: {
          type: 'string',
          enum: ['BUYER', 'SELLER'],
        },
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        sessionId: {
          type: 'string',
        },
      },
    },
    ...VALIDATION_SCHEMA_ERRORS,
  },
};
