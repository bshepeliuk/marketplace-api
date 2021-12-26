import { pinoLogger } from './pinoLogger';

function listenToRedisConnection(instance) {
  instance.client.on('connect', () => {
    pinoLogger.info('Connected to Redis successfully');
  });

  instance.client.on('error', (err) => {
    pinoLogger.error('Could not establish a connection with redis. ');
  });
}

export default listenToRedisConnection;
