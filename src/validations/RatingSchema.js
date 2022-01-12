import { VALIDATION_SCHEMA_ERRORS } from './schema_errors';

export const addRatingForDeviceSchema = {
  body: {
    type: 'object',
    required: ['rate', 'userId', 'deviceId'],
    properties: {
      rate: { type: 'number' },
      userId: { type: 'number' },
      deviceId: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        rating: {
          type: 'object',
          properties: {
            rate: { type: 'number' },
            userId: { type: 'number' },
            deviceId: { type: 'number' },
          },
        },
      },
    },
    ...VALIDATION_SCHEMA_ERRORS,
  },
};
