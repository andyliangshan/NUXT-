/**
 * 随机
 * https://blog.tompawlak.org/generate-random-values-nodejs-javascript
 */
import { debug } from 'util';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import NodeRSA from 'node-rsa';

const nodeRSAEncryptWithPubKey = (toEncrypt, relativeOrAbsolutePathToPublicKey) => {
  const myDecrypter = new NodeRSA(fs.readFileSync(relativeOrAbsolutePathToPublicKey));
  myDecrypter.setOptions({ encryptionScheme: 'pkcs1' });
  const encrypted = myDecrypter.encrypt(toEncrypt, 'base64');
  return encrypted;
};

const nodeRSADecryptWithPriKey = (toDecrypt, relativeOrAbsolutePathtoPrivateKey) => {
  const myDecrypter = new NodeRSA(fs.readFileSync(relativeOrAbsolutePathtoPrivateKey));
  myDecrypter.setOptions({ encryptionScheme: 'pkcs1' });
  return myDecrypter.decrypt(toDecrypt, 'utf8');
};

/**
 * 公钥加密
 * @param {String} toEncrypt 加密内容
 * @param {String} relativeOrAbsolutePathToPublicKey 公钥地址
 */
const encryptStringWithRsaPublicKey = (toEncrypt, relativeOrAbsolutePathToPublicKey) => {
  const absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
  const publicKey = fs.readFileSync(absolutePath, 'utf8');
  // const buffer = new Buffer(toEncrypt);
  const buffer = Buffer.from(toEncrypt);
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    buffer,
  );
  return encrypted.toString('base64');
};

/**
 * 私钥解密
 * @param {String} toDecrypt 解密的内容
 * @param {String} relativeOrAbsolutePathtoPrivateKey 私钥地址
 */
const decryptStringWithRsaPrivateKey = (toDecrypt, relativeOrAbsolutePathtoPrivateKey) => {
  const absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
  const privateKey = fs.readFileSync(absolutePath, 'utf8');
  // const buffer = new Buffer(toDecrypt, 'base64');
  const buffer = Buffer.from(toDecrypt, 'base64');
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    buffer,
  );
  return decrypted.toString('utf8');
};

/**
 * 加密码
 * @param data 内容
 * @param key 密钥
 * @returns {*}
 */
const aesEncrypt = (data, key) => {
  const cipher = crypto.createCipher('aes-128-ecb', key);
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
};

/**
 * 解密
 * @param data 内容
 * @param key 密钥
 * @returns {*}
 */
const aesDecrypt = (data, key) => {
  const cipher = crypto.createDecipher('aes-128-ecb', key);
  return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
};

/**
 * 生成 len 长度的 16进制 随机字符串
 * example:
 * randomValueHex(12) // value 'd5be8583137b'
 * randomValueHex(2)  // value 'd9'
 * @param {Number} len
 */
const randomValueHex = len =>
  crypto
    .randomBytes(Math.ceil(len / 2)) //  buffer: <Buffer 02 9a 28 8b ed 55 d6 8d de>
    .toString('hex') // convert to hexadecimal format
    .slice(0, len); // return required number of characters

/**
 * 生成 len 长度的 16进制 base64 字符串
 * example：
 * randomValueBase64(12) // value 'wNm2OQu7UaTB'
 * randomValueBase64(2)  // value 'Lj'
 * @param {Number} len
 */
const randomValueBase64 = len =>
  crypto
    .randomBytes(Math.ceil(len * 3 / 4)) //  buffer: <Buffer 02 9a 28 8b ed 55 d6 8d de>
    .toString('base64') // convert to base64 format
    .slice(0, len) // return required number of characters
    .replace(/\+/g, '0') // replace '+' with '0'
    .replace(/\//g, '0'); // replace '/' with '0'

/**
 * 根据 随机种子， 生成 howMany 长度的 随机字符串
 * example:
 * random(10);         // returns "rkp6rt7EBc"
 * random(10, "ABBB"); // returns "BABBBBABAB"
 * @param {Number} howMany 10
 * @param {String} chars exp: "ABBB"; default: abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789
 */
const random = (howMany, chars) => {
  chars = chars || 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';
  const rnd = crypto.randomBytes(howMany);
  const value = new Array(howMany);
  const len = chars.length;

  for (let i = 0; i < howMany; i++) {
    value[i] = chars[rnd[i] % len];
  }

  return value.join('');
};

/**
 * md5 加密
 * @param content
 * @returns {*}
 */
const md5 = content =>
  crypto
    .createHash('md5')
    .update(content)
    .digest('hex');

/**
 * aes-256-ecb 加密
 * @param data 内容
 * @param key 密钥
 * @returns {*}
 */
const aesEncrypt256 = (data, key) => {
  const cipher = crypto.createCipheriv('aes-256-ecb', key, '');
  const cipherChunks = [];
  cipherChunks.push(cipher.update(data, 'utf8', 'hex'));
  cipherChunks.push(cipher.final('hex'));
  return cipherChunks.join('');
};

/**
 * aes-256-ecb 解密
 * @param data 内容
 * @param key 密钥
 * @returns {*}
 */
const aesDecrypt256 = (data, key) => {
  const cipherChunks = [data];
  const decipher = crypto.createDecipheriv('aes-256-ecb', key, '');
  const plainChunks = [];
  for (let i = 0; i < cipherChunks.length; i++) {
    plainChunks.push(decipher.update(cipherChunks[i], 'hex', 'utf8'));
  }
  plainChunks.push(decipher.final('utf8'));
  return plainChunks.join('');
};

export default {
  encryptStringWithRsaPublicKey,
  decryptStringWithRsaPrivateKey,
  aesEncrypt,
  aesDecrypt,
  md5,
  random,
  randomValueHex,
  randomValueBase64,
  aesEncrypt256,
  aesDecrypt256,
  nodeRSAEncryptWithPubKey,
  nodeRSADecryptWithPriKey,
};
