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
      },
    },
    400: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
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
      },
    },
    400: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
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
    400: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    500: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};
