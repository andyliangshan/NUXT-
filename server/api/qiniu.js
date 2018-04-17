import {
    Router
} from 'express'
import {
    wrapper
} from '../tools/wrapper';
import {
    qnAccess
} from '../config';

import * as qiniu from 'qiniu';

const router = new Router()

/**
 * 获取七牛上传令牌
 */
router.get('/qiniu/token', wrapper(true, (req, res) => {
    qiniu.conf.ACCESS_KEY = qnAccess.accessKey;
    qiniu.conf.SECRET_KEY = qnAccess.secretKey;
    const policy = new qiniu.rs.PutPolicy({
        scope: qnAccess.bucket,
        returnBody: '{"key":$(key),"fname":$(fname),"fsize":$(fsize),"mimeType":$(mimeType),"ext":$(ext),"imageInfo":$(imageInfo)}'
    });

    const token = policy.uploadToken();
    res.json({
        token
    });
}));

export default router