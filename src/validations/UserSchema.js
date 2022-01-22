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
      },
    },
    ...VALIDATION_SCHEMA_ERRORS,
  },
};
