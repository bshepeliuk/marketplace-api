import { pinoLogger } from './pinoLogger';

function listenToRedisConnection(instance) {
  instance.client.on('connect', () => {
    pinoLogger.info('Connected to Redis successfully');
  });

  instance.client.on('error', (error) => {
    pinoLogger.error('Could not establish a connection with redis. ');
    pinoLogger.error(error.message);
  });
}

export default listenToRedisConnection;
