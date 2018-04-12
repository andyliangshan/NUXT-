import Redis from 'ioredis';
import { redisConfigFunc } from '../../config';

const client = new Redis(redisConfigFunc(0));

client.on('error', err => {
  if (err) {
    console.log('connect to redis error, please check redis config', err);
    process.exit(1);
  }
});

export default client;
