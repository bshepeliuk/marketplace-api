export const VALIDATION_SCHEMA_ERRORS = {
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
};
