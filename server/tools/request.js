import agent from '../utils/fetch/superAgent';
import SecretKey from '../utils/encry/cryptoer';

import {
    aesKeys
} from '../config';


const API_BASE = 'http://apitest.zhib.net';

/**
 * 通用 API 调用方法，用法示例：
 * ```javascript
 * new Request('/util/valid/phone', {phone: '131234567890'}).get()
 * ```
 * @param {string} api 要访问的API，以 / 开头的绝对URL
 * @param {object} raw 要提交的数据对象
 */
export const Request = function (api, raw) {
    let dba;
    raw = raw || {};
    raw.from = 'pc';

    const keys = Object.keys(raw);
    const rawValues = [];
    for (let key of keys) {
        rawValues.push(`${key}==${raw[key]}`);
    }
    const aesStr = rawValues.join('&&');
    dba = SecretKey.aesEncrypt256(aesStr, aesKeys);

    const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys);
    const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)

    const data = {
        timespan,
        raid
    };

    const url = API_BASE + api;

    this.get = function () {
        data.dba = dba;
        return agent.get(url, data);
    }

    this.post = function () {

        return agent.post(url, data, {
            dba
        });
    }
}