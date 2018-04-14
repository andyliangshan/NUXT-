/**
 * 一个封装 expressjs router 异步函数的函数
 * @param {Function} fn 
 */
export const wrapper = function (fn) {
    return function (req, res, next) {
        // const ret = fn.call(null, req, res, next);
        const ret = fn.apply(undefined, arguments);
        if (ret instanceof Promise) {
            ret.then(() => {
                if (!res.headersSent) {
                    next();
                }
            }).catch(err => {
                console.error(err);
                res.send(500);
            });
        }
    };
};