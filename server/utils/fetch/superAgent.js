/* eslint no-unused-expressions: 0 */

import querystring from 'querystring';
import request from 'superagent';
// import moment from 'moment';
import _ from 'lodash';
import logger from '../log4js';


const HttpClient = {

    cookie: '',

    get: (url, query, cookie = '', headers = {}) => new Promise((resolve, reject) => {
        const preTime = Date.now();
        _.extend(headers, {
            'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT',
        });

        const req = request
            .get(url)
            .timeout(20000)
            .set(headers)
            .set('Cookie', cookie)
            .accept('application/json');

        if (query) {
            req.query(query);
        }

        req.end((err, res) => {
            logger.info('request-get-url: ' + url + '?' + querystring.encode(query) + '****' + (Date.now() - preTime) + 'ms');
            console.log(err);
            if (err) {
                logger.error('request-get-url-error: ' + err + ' ,status: ' + err.status + ' ,url:' + url + '****' + (Date.now() - preTime) + 'ms');
                reject(err);
            } else {
                resolve(res.body || res);
            }
        });
    }),

    put: (url, data, query, cookie) => new Promise((resolve, reject) => {
        const req = request.put(url)
            .accept('application/json')
            .set('Cookie', cookie)
            .send(data);

        if (query) {
            req.query(query);
        }

        req.end((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.body || res);
            }
        });
    }),

    post: (url, query, body, cookie = '', headers = {}, timeout = 30000) => new Promise((resolve, reject) => {
        const req = request.post(url)
            .timeout(timeout)
            .set(headers)
            .set('Cookie', cookie)
            .accept('application/json')
            .send(body)
        if (query) {
            req.query(query)
        }
        req.end((err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res.body || res)
            }
        });
    }),

    del: (url, query) => new Promise((resolve, reject) => {
        const req = request.del(url)
            .accept('application/json');

        if (query) {
            req.query(query);
        }

        req.end((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res.body || res);
            }
        });
    }),

};

export default HttpClient;
// const endC = (err, res, url, query, preTime, resolve) => {
//   logger.info(
//     `request-get-url: ${url}?${querystring.encode(query)} *** ${Date.now() -
//       preTime}ms`,
//   );
//   if (err) {
//     console.log(err);
//     logger.error(
//       `request-get-url-error: url: ${url} *** status: ${
//         err.status
//       } *** ${Date.now() - preTime}ms`,
//     );
//     resolve(res ? res.body : null);
//   } else {
//     resolve(res.body || res);
//   }
// };
//
// const HttpClient = {
//   cookie: '',
//
//   fetch: (
//     url,
//     query = {},
//     method = 'get',
//     body,
//     cookie = '',
//     headers = {},
//     timeout = 30000,
//   ) =>
//     new Promise(resolve => {
//       const preTime = Date.now();
//       _.extend(headers, {
//         'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT',
//       });
//       const req =
//         method === 'get'
//           ? request
//               .get(url)
//               .timeout(timeout)
//               .set(headers)
//               .set('Cookie', cookie)
//               .accept('application/json')
//           : request
//               .get(url)
//               .timeout(timeout)
//               .set(headers)
//               .set('Cookie', cookie)
//               .accept('application/json');
//
//       if (query) {
//         req.query(query);
//       }
//
//       req.end((err, res) => endC(err, res, url, query, preTime, resolve));
//     }),
//
//   get: (
//     url,
//     query,
//     cookie = '',
//     headers = {},
//     timeout = 30000,
//   ) =>
//     new Promise(resolve => {
//       const preTime = Date.now();
//       _.extend(headers, {
//         'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT',
//       });
//       const req = request
//         .get(url)
//         .timeout(timeout)
//         .set(headers)
//         .set('Cookie', cookie)
//         .accept('application/json');
//       if (query) {
//         req.query(query);
//       }
//       req.end((err, res) =>
//         endC(err, res, url, query, preTime, resolve),
//       );
//     }),
//
//   put: (url, data, query) =>
//     new Promise((resolve, reject) => {
//       const req = request
//         .put(url)
//         .accept('application/json')
//         .send(data);
//
//       if (query) {
//         req.query(query);
//       }
//
//       req.end((err, res) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(res.body || res);
//         }
//       });
//     }),
//
//   post: (url, query, body, cookie = '', headers = {}, timeout = 30000) =>
//     new Promise(resolve => {
//       const preTime = Date.now();
//       const req = request
//         .post(url)
//         .timeout(timeout)
//         .set(headers)
//         .set('Cookie', cookie)
//         .accept('application/json')
//         .send(body);
//
//       if (query) {
//         req.query(query);
//       }
//
//       req.end((err, res) => endC(err, res, url, query, preTime, resolve));
//     }),
//
//   del: (url, query) =>
//     new Promise((resolve, reject) => {
//       const req = request.del(url).accept('application/json');
//
//       if (query) {
//         req.query(query);
//       }
//
//       req.end((err, res) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(res.body || res);
//         }
//       });
//     }),
// };
//
// export default HttpClient;
