
import path from 'path';

const isDebug = process.env.NODE_ENV !== 'production';
console.log('isDebugisDebugisDebugisDebug', isDebug);

export const loggDir = path.join(__dirname, '../logs');
//  文件缓存目录
export const cacheDir = path.join(__dirname, '../caches');

export const aesKeys = '9ae62c1234d999cfc123c1236db8888c';

// 引入公钥
export const pubKeys = path.join(__dirname, '../public.pem');

export const redisConfigFunc = (db = 0) =>
  //  npm run test 启动
  ({
    host: '127.0.0.1',
    port: 6379,
    db,
  });

// 7牛的access信息，用于文件上传
export const qnAccess = {
  accessKey: 'lt3LIxg48r43F4HlBddbIrPpNlbCefwaPUXhToWI', //  'lt3LIxg48r43F4HlBddbIrPpNlbCefwaPUXhToWI',
  secretKey: 'g13ntO39qQEQNE4mZkSon_ZNNLN-k7DPL5ThGUTC', //  'g13ntO39qQEQNE4mZkSon_ZNNLN-k7DPL5ThGUTC',
  bucket: 'zhib',
  origin: 'http://p618ls2lm.bkt.clouddn.com',
  uploadURL: '',
};

export const mailOptions = {
  host: 'smtp.exmail.qq.com',
  port: 25,
  auth: {
    user: 'we',
    pass: '00',
  },
};

export const cookieConf = {
  timeout: isDebug ? 1000 * 60 * 60 * 24 : 1000 * 60 * 60, // 24h - 1h
};

export const serverPort = {
  port: process.env.PORT || 3001,
};

/**
 * 服务器接到请求的时间和参数中的时间戳是否相差很长一段时间
 */
export const timespanGapSeconds = 15; // /s

export const resApi = {
  zhiBApi: 'http://apitest.zhib.net'
}

export const debug = isDebug;