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
 * @param {object} dbaRaw dba 原始对象，如 {userId: 'xxx', categoryId: 'yy'}
 * @param {object} bodyRaw 要提交的数据，如 {content: 'xxx', contentBold: 'yyy'}，可以为空
 */
export const Request = function (api, dbaRaw, bodyRaw) {
    dbaRaw = dbaRaw || {};
    dbaRaw.from = 'pc';

    const keys = Object.keys(dbaRaw);
    const rawValues = [];
    for (let key of keys) {
        rawValues.push(`${key}==${dbaRaw[key]}`);
    }
    const aesStr = rawValues.join('&&');
    const dba = SecretKey.aesEncrypt256(aesStr, aesKeys);

    const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys);
    const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)

    const query = {
        timespan,
        raid
    };

    const url = resApi.zhiBApi + api;

    let body = {
        dba
    };

    // 如果有提交的 body 内容，则转换成字符串后加密
    if (bodyRaw) {
        let keys = Object.keys(bodyRaw);
        for (let key of keys) {
            let value = bodyRaw[key];
            if (typeof value !== 'string') {
                value = JSON.stringify(value);
            }
            body[key] = SecretKey.aesEncrypt256(value, aesKeys);
        }
    }

    /**
     * 以GET方式提交数据
     */
    this.get = function () {
        Object.assign(query, body);
        return agent.get(url, query);
    }

    /**
     * 以POST方式提交数据
     */
    this.post = function () {
        return agent.post(url, query, body);
    }
}