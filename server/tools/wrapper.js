import redis from '../utils/redis/redisCache';
/**
 * 一个封装 expressjs router 异步函数的函数
 * @param {boolean | function} accessCheck 如果此参数为 boolean 类型，并且为true，则验证当前用户是否登录，此时第二个参数为必传
 * @param {function} fn 要封装的 express router 处理方法
 */
export const wrapper = function (accessCheck, fn) {
    fn = fn || accessCheck;
    accessCheck = accessCheck === true;

    return function (req, res, next) {
        console.log(req.session.loginData, '.....登录信息检验是否人session....')
        if (accessCheck) {
            // TODO: check session，要素：登录之后发行 access token，在此检查 access token，提取用户
            let canAccess = Boolean(req.session.loginData);
            console.log(req.session.loginData, '.....3333....')
            // 如果用户没有登录（从 redis 里取不到用户数据），则禁止访问
            if (!canAccess) {
                res.json({
                    msg: '请先登录',
                    success: false
                });
                return;
            }
        }
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