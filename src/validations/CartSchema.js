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
