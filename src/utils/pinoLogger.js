import pino from 'pino';

export const pinoLogger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
    },
  },
});
