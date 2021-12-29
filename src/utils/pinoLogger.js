import pino from 'pino';
import { isItTestMode } from './checkEnvMode';

const prettyPinoOptions = {
  target: 'pino-pretty',
  options: {
    colorize: true,
    translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
  },
};

export const pinoLogger = pino({
  transport: isItTestMode() ? null : prettyPinoOptions,
});
