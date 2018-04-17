import agent from '../utils/fetch/superAgent';
import SecretKey from '../utils/encry/cryptoer';

import {
    aesKeys,
    resApi
} from '../config';

/**
 * 通用 API 调用方法，用法示例：
 * ```javascript
 * new Request('/util/valid/phone', {phone: '131234567890'}).get()
 * ```
 * @param {string} api 要访问的API，以 / 开头的绝对URL
 * @param {object} raw 要提交的数据对象
 */
export const Request = function (api, data) {
    let dba;
    data = data || {};
    data.from = 'pc';

    const keys = Object.keys(data);
    const rawValues = [];
    for (let key of keys) {
        rawValues.push(`${key}==${data[key]}`);
    }
    const aesStr = rawValues.join('&&');
    dba = SecretKey.aesEncrypt256(aesStr, aesKeys);
    console.log(aesStr, '*********', dba, '*********');
    const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys);
    const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)

    const _data = {
        timespan,
        raid
    };

    const url = resApi.zhiBApi + api;

    this.get = function () {
        _data.dba = dba;
        return agent.get(url, _data);
    }

    this.post = function () {
        return agent.post(url, _data, {
            dba
        });
    }
}