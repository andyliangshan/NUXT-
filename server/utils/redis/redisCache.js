/* eslint no-param-reassign:0 no-unused-expressions: 0 */

/**
 * redis缓存时间级别 为 s
 * 60 * 5 = 5min
 */
import redis from './redis';
import logger from '../log4js';

const prefixKey = 'zhib|api|';
class RedisCache {
  /**
   * get value by key
   * @param key string
   * @returns {*} value | null
   */
  static async get(key) {
    key = prefixKey + key;
    const time = new Date();
    let bkData;
    try {
      bkData = await redis.get(key);
      const duration = new Date() - time;
      logger.debug(`redis cache get * ${key} *${duration}ms `);
      return JSON.parse(bkData);
    } catch (error) {
      console.log(error);
      logger.fatal(error);
      return null;
    }
  }

  /**
   * set key-value or add time
   * @param key
   * @param value
   * @param time cache time
   * @returns {*} ok | ''
   */
  static async set(key, value, time) {
    key = prefixKey + key;
    const t = new Date();
    value = JSON.stringify(value);
    let bkSet;
    try {
      if (!time) {
        bkSet = await redis.set(key, value);
      } else {
        bkSet = await redis.setex(key, time, value);
      }
      const duration = new Date() - t;
      logger.debug(`redis cache set * ${key} *${duration}ms `);
      return bkSet;
    } catch (error) {
      console.log(error);
      logger.fatal(error);
      return '';
    }
  }

  /**
   * 使用管道 批量删除在一组key
   * array for key(string)
   */
  static async delMulti(...args) {
    const t = new Date();
    const pipeline = redis.pipeline();
    const [arr] = [...args];
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const directive of arr) {
        // eslint-disable-line
        pipeline.del(prefixKey + directive);
      }
      pipeline.exec((err, results) => {
        const duration = new Date() - t;
        logger.debug(
          `redis cache del * ${arr.map(
            item => prefixKey + item,
          )} * ${duration}ms`,
        );
        err ? reject(err) : resolve(results);
      });
    });
  }
}

export default RedisCache;
