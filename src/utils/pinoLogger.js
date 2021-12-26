import pino from 'pino';

export const pinoLogger = pino({
  transport: {
    target: 'pino-pretty',
  },
});
