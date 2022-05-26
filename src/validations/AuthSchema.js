import { VALIDATION_SCHEMA_ERRORS } from './schema_errors';

export const LoginSchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            fullName: { type: 'string' },
            role: {
              type: 'string',
              enum: ['BUYER', 'SELLER'],
            },
          },
        },
        stripeAccount: {
          type: 'object',
          nullable: true,
          properties: {
            id: { type: 'string' },
            isActive: { type: 'boolean' },
          },
        },
      },
    },
    ...VALIDATION_SCHEMA_ERRORS,
  },
};

export const RegisterSchema = {
  body: {
    type: 'object',
    required: ['email', 'fullName', 'password', 'role'],
    properties: {
      email: { type: 'string' },
      fullName: { type: 'string' },
      password: { type: 'string' },
      role: {
        type: 'string',
        enum: ['BUYER', 'SELLER'],
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        user: {
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
          },
        },
      },
    },
    ...VALIDATION_SCHEMA_ERRORS,
  },
};

export const LogoutSchema = {
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
