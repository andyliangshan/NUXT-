/**
 * socket
 * handshake:
 */

// { headers:
//   { host: 'localhost:8080',
//     connection: 'keep-alive',
//     pragma: 'no-cache',
//     'cache-control': 'no-cache',
//     accept: '*/*',
//     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36',
//     referer: 'http://localhost:8080/test',
//     'accept-encoding': 'gzip, deflate, br',
//     'accept-language': 'en,zh-CN;q=0.9,zh;q=0.8',
//     cookie: 'UM_distinctid=161f5392e845d9-03f0cee1f3e0fb-32697a04-232800-161f5392e85e9a; CNZZDATA1260189920=1955846602-1520236130-%7C1520236130; _ga=GA1.1.295635708.1520237622; Hm_lvt_8309c7733b9dec887efa1db234057a19=1520237622; MEIQIA_EXTRA_TRACK_ID=8afc52da45c711e799fb06528f332652; Hm_lvt_21d8729c48ba5aa1fae0ead4cc99dc53=1520559317; zhibsid=s%3AUNbMP4oPipEZgDI1SeXsZ3NobfEEvl_E.5AT1vTmnwLn0KXM%2BCsCXkRdPys8vj%2B99ZEenwGXZqYg; io=pVkgfwQXGlNQCdyaAAAB' },
//  time: 'Wed Mar 14 2018 15:53:33 GMT+0800 (CST)',
//  address: '127.0.0.1',
//  xdomain: false,
//  secure: false,
//  issued: 1521014013474,
//  url: '/socket.io/?EIO=3&transport=polling&t=M8ZV_uO',
//  query: { EIO: '3', transport: 'polling', t: 'M8ZV_uO' } }

import validator from 'validator';
import redisAdapter from 'socket.io-redis';
import redis from '../../utils/redis/redisCache';
import { ioNamespace, aes128ecbKey, socketMessageType } from '../../common/constant';
import cryptoer from '../../utils/encry/cryptoer';
import { redisConfigFunc } from '../../config';

let instance;
const numUsers = 0;

const testName = Math.random();

const isDebug = process.env.NODE_ENV !== 'production';

export const connPool = [];

export default (app, server) => {
  if (instance) {
    console.log('instance is exist');
    return instance;
  }

  const io = require('socket.io')(server); //eslint-disable-line
  io.adapter(redisAdapter(redisConfigFunc(6)));

  // middleware
  io.use(async (socket, next) => {
    // console.log(socket.handshake.query);
    // console.log(socket.id);
    if (isDebug) return next();

    const rdm = socket.handshake.query.rdm;
    // 验证链接的 rdm 21位随机传的唯一性
    if (!rdm.length !== 21 || rdm) {
      return next(new Error('authentication error'));
    }

    return next();
  });

  io.set('authorization', async (hsData, accept) => {
    // console.log('authorization: hsData._query');
    hsData.headers.signatureUser = { name: 'wgx' };
    // console.log(hsData._query);
    if (isDebug) return accept(null, true);

    let deviceId;
    let signature;
    try {
      deviceId = cryptoer.aesDecrypt(hsData._query.did, aes128ecbKey);
      signature = cryptoer.aesDecrypt(hsData._query.signature, aes128ecbKey);
    } catch (err) {
      console.log(err);
      return accept('authentication error.', false);
    }

    const signatureKey = `signature|signature_${signature}|deviceId_${deviceId}`;
    const redisUserVal = await redis.get(signatureKey);
    if (!redisUserVal) return accept('authentication error.', false);

    // 把当前用户数据传给socket.io的handshakeData
    hsData.headers.sessions = redisUserVal;
    return accept(null, true);

    // var cookies = parseCookies(cookie.parse(hsData.headers.cookie), config.session.secret)
    //     , sid = cookies['balloons'];
    //   sessionStore.load(sid, function(err, session) {
    //     if(err || !session) {
    //       return accept('Error retrieving session!', false);
    //     }
    //     hsData.balloons = {
    //       user: session.passport.user,
    //       room: /\/(?:([^\/]+?))\/?$/g.exec(hsData.headers.referer)[1]
    //     };
  });

  io.of(ioNamespace).on('connection', async socket => {
    console.log('client connect ', socket.id);
    console.log(socket.handshake);
    socket.emit('my-name-is', testName);

    // 第一次连接  将该连接的 id 传递给客户端，方便后期调用
    socket.emit('connId', { type: socketMessageType.CONNECT, connId: socket.id });

    connPool.push(socket);
    redis.set(`socket|conn_${socket.id}`, {});

    socket.on('start', () => {
      console.log('socket start ...........');
    });

    socket.on('disconnect', () => {
      console.log(`disconnect: ${socket.id}`);
      socket.emit({
        username: testName,
      });
      redis.delMulti([`socket|conn_${socket.id}`]);
      connPool.splice(connPool.indexOf(socket), 1);
    });
  });

  instance = io;
};
