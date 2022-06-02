import { VALIDATION_SCHEMA_ERRORS } from './schema_errors';

export const UserAccountSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        user: {
          id: { type: 'string' },
          email: { type: 'string' },
          fullName: { type: 'string' },
          role: {
            type: 'string',
            enum: ['BUYER', 'SELLER'],
          },
        },
        stripeAccount: {
          type: 'object',
          nullable: true,
          properties: {
            id: { type: 'string' },
            isActive: { type: 'boolean' },
            balance: {
              type: 'object',
              properties: {
                available: { type: 'array' },
                pending: { type: 'array' },
                instant_available: { type: 'array' },
              },
            },
          },
        },
      },
    },
    ...VALIDATION_SCHEMA_ERRORS,
  },
};
