import fs from 'fs';
import path from 'path';
import util from 'util';
import moment from 'moment';
import {
    Router
} from 'express'
import SecretKey from '../utils/encry/cryptoer'
import agent from '../utils/fetch/superAgent'
import validator from 'validator'
import {
    aesKeys,
    cookieConf,
    pubKeys
} from '../config'
import {
    fetchDeviceId
} from '../common/remote'
import redis from '../utils/redis/redisCache'
import requestIp from 'request-ip'
import qnStore from "../common/qnStore";
import auth from '../middlewares/auth'
import logger from "../utils/log4js";
import {
    resApi
} from '../config'
import {
    Request
} from '../tools/request';
import {
    wrapper
} from '../tools/wrapper';
import app from '../index';

const router = new Router()

// 验证手机号是否被注册
router.get('/valid/phone', wrapper(async (req, res) => {
    const phone = validator.trim(req.query.phone || '');

    if (!validator.isMobilePhone(phone, 'zh-CN')) {
        return res.json({
            msg: '手机号码错误',
            success: true
        });
    }

    const deviceId = fetchDeviceId(req);
    const phoneData = await new Request('/util/valid/phone', {
        phone
    }).get();
    console.log(phoneData, '-----')
    if (phoneData.success) {
        redis.set(`${deviceId}_store_phone`, phone, 60 * 5)
        redis.set(`${deviceId}_phoneData`, phoneData, 60 * 5)
        res.json({
            msg: '返回成功',
            data: phoneData,
            success: true
        });
    } else {
        res.json({
            msg: '返回错误',
            success: false
        });
    }
}));

// 用户登录
router.post('/login', wrapper(async (req, res) => { // auth.detectTimespan
    const password = validator.trim(req.body.password || '');
    const phone = validator.trim(req.body.phone || '');
    const ip = requestIp.getClientIp(req);
    const deviceId = fetchDeviceId(req);

    if (!password) {
        return res.json({
            success: false,
            msg: 'pass error'
        })
    }
    if (!phone) {
        return res.json({
            success: false,
            msg: 'phone error'
        })
    }

    const loginData = await new Request('/account/login', {
        ip,
        phone,
        password,
        deviceId
    }).post();

    if (loginData && loginData.success) {
        // { signature, user: {} }
        req.session.loginData = loginData.data;
        const encDid = SecretKey.aesEncrypt256(deviceId, aesKeys);
        redis.set(encDid, loginData.data, cookieConf.timeout / 1000);
        // generate cookie
        res.cookie('jwt-did', encDid, {
            // domain: '.zhib.net',
            path: '/',
            maxAge: cookieConf.timeout,
            httpOnly: true
        });
        const expires = moment().add('days', cookieConf.timeout / 1000 * 60 * 60 * 24).valueOf();
        // TODO: 生成加密验证信息
        const token = 'abc';

        return res.json({
            msg: '登录成功',
            success: true,
            token: token,
            user: loginData.data.user,
        });
    } else {
        return res.json({
            msg: '登录失败',
            success: false
        });
    }
}));

// 获取验证码
router.post('/phoneCode', wrapper(async (req, res) => {
    const ip = requestIp.getClientIp(req);
    const deviceId = fetchDeviceId(req);
    const phone = req.body.phone;
    const type = req.body.type;
    // TODO: 验证参数 验证referer  /login/setPassword
    const codeData = await new Request('/util/phoneCode', {
        phone,
        deviceId,
        type,
        ip
    }).post();
    if (codeData.success) {
        res.status(200).json({
            msg: '发送成功.',
            timeout: 60,
            phone: phone
        });
    } else {
        res.status(500).json({
            msg: '发送失败.'
        });
    }
}));

// 设置密码
router.post('/account/password', wrapper(async (req, res) => { // auth.detectTimespan
    const ip = requestIp.getClientIp(req);
    const deviceId = fetchDeviceId(req);
    const phone = await redis.get(`${deviceId}_store_phone`);
    console.log(req.body);
    const phoneCode = req.body.phoneCode || '';
    const password = req.body.password || '';

    if (!password || password.length < 6) {
        res.status(500).json({
            msg: '密码长度不能少于6位',
            success: false
        });
        return;
    }

    const accountData = await new Request('/account/password', {
        phone,
        phoneCode,
        password,
        deviceId,
        ip,
        type: 'password'
    }).post();

    if (accountData.success) {
        req.session.loginData = accountData.data;
        const encDid = SecretKey.aesEncrypt256(deviceId, aesKeys);
        redis.set(encDid, accountData.data, cookieConf.timeout / 1000);
        // generate cookie
        res.cookie('jwt-did', encDid, {
            // domain: '.zhib.net',
            path: '/',
            maxAge: cookieConf.timeout,
            httpOnly: true
        });
        const expires = moment().add('days', cookieConf.timeout / 1000 * 60 * 60 * 24).valueOf();
        // TODO: 生成加密验证信息
        const token = 'abc';
        return res.json({
            msg: '设置密码成功.',
            timeout: 60,
            success: true,
            token: token,
            user: accountData.data.user,
        });
    } else {
        return res.json({
            msg: '设置密码失败.',
            success: false
        });
    }
}));

/**
 * 修改密码
 * /account/password/update
 * method: post
 * body
 * token
 * dba phone==xx&&phoneCode==xx&&password==xxx&&type==xxx
 * phone,phoneCode,password
 * type: 修改密码时为 update
 */
router.post('/account/password/update', wrapper(true, async (req, res) => {
    const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
    const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
    const deviceId = fetchDeviceId(req)
    const phone = await redis.get(`${deviceId}_store_phone`)
    const phoneCode = validator.trim(req.body.phoneCode || '')
    const password = validator.trim(req.body.password || '')
    if (phoneCode && validator.isNumeric(phoneCode)) {
        return res.status(500).json({
            msg: '验证码错误',
            success: false
        })
    }
    if (password && password.length < 6) {
        return res.status(500).json({
            msg: '密码长度小于6',
            success: false
        })
    }
    const updateData = await new Request('/account/password/update', {
        phone,
        phoneCode,
        password,
        type: 'update'
    }).post();
    console.log(updateData, '.......1001.......')
    if (updateData.success) {
        return res.status(200).json({
            msg: '设置成功.',
            timeout: 60,
            success: true
        })
    } else {
        return res.status(500).json({
            msg: '设置失败.',
            success: false
        })
    }
}))

// 编辑用户信息
router.post('/updateUserInfo', async (req, res, next) => { // auth.requireUser
    const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys);
    const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys);
    const nickName = validator.trim(req.body.nickName || '');
    const avatarImage = req.body.avatarImage || '';
    const introduce = req.body.introduce || '';

    const userId = req.session.loginData.user.id;
    const phone = req.session.loginData.user.phone;
    const signature = req.session.loginData.signature;

    if (!nickName) {
        return res.status(500).json({
            msg: '昵称不为空',
            errcode: -1,
        });
    }
    const deviceId = fetchDeviceId(req);
    const pubStr = `phone==${phone}&&signature==${signature}&&deviceId==${deviceId}`;
    const aesStr = `nickName==${nickName}&&avatarImage==${avatarImage}&&introduce==${introduce}&&userId==${userId}`;
    const dba = SecretKey.aesEncrypt256(aesStr, aesKeys);
    const token = SecretKey.nodeRSAEncryptWithPubKey(pubStr, pubKeys);

    try {
        const infoData = await agent.post(`${resApi.zhiBApi}/user/updateInfo`, {
            timespan,
            raid
        }, {
            dba,
            token
        });
        if (infoData.success) {
            return res.json({
                msg: '信息更新成功',
                success: true,
                data: infoData
            });
        } else {
            return res.json({
                msg: '信息更新失败',
                success: false,
            });
        }
    } catch (err) {
        next(err);
    }
});

// 获取用户信息
// /user/info?timespan=xx&raid=xx
// method: post
// body
// dba(必须) aes 加密的 aes(userId==xxx)
router.post('/userInfo', wrapper(async (req, res) => {
    let userId = req.body.userId;
    if (!userId) {
        if (req.session.loginData) {
            userId = req.session.loginData.user.id
        }
    }
    const userInfoData = await new Request('/user/info', {
        userId
    }).post();
    if (userInfoData.success) {
        return res.json({
            msg: '获取用户信息返回成功',
            success: true,
            data: userInfoData.data
        })
    } else {
        return res.json({
            msg: '获取用户信息返回失败',
            success: false
        })
    }
}))

//  base64转图片
router.post('/base642img', async (req, res) => {
    req.busboy.on('field', function (key, value, keyTruncated, valueTruncated) {
        const base64Data = value.replace(/^data:image\/\w+;base64,/, '');
        const dataBuffer = new Buffer(base64Data, 'base64');
        fs.writeFile(path.join(__dirname, `../../upload/holeImg.png`), dataBuffer, function (err) {
            console.log('11', __dirname)
            if (err) {
                console.log('22')
                res.json({
                    code: -1,
                    msg: err,
                });
            } else {
                console.log('33')
                // ../upload/a5f70019ad238d0cf5ef3a2eb4d7763c.jpg
                qnStore.upload(fs.createReadStream(path.join(__dirname, '../../upload/holeImg.png')), function (err, result) {
                    console.log('55')
                    console.log(err, result);
                    if (err) {
                        logger.error('骑牛上传图片失败,错误信息:' + util.inspect(err));
                        console.log('upload qn error', err);
                        res.json({
                            code: -1,
                            msg: err,
                        });
                    } else {
                        console.log('地址为: ', result);
                        res.json({
                            error: 0,
                            success: true,
                            url: result.url,
                        });
                    }
                });
            }
        });
    });
    req.busboy.on('finish', function () {
        console.log('Done parsing form!');
    });
    req.pipe(req.busboy);
});

/**  赞只能赞
 * user/action/zan
 * token(必须) 公钥加密的 deviceId, phone, signature
 * dba(必须) aes 加密的 userId,targetUserId,tweetId,topReplyId,subReplyId
 * userId(必选) login user
 * targetUserId(必选) 被点赞的 博文所属用户
 * tweetId(必选) 点赞的 博文
 * topReplyId(可选) 点赞的 顶级回复
 * subReplyId(可选) 点赞的 二级回复
 */
router.post('/action/zan', auth.requireUser, async (req, res, next) => {
    const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys);
    const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys);
    const userId = req.session.loginData.user.id;
    const phone = req.session.loginData.user.phone;
    const signature = req.session.loginData.signature;

    const targetUserId = req.body.targetUserId || '';
    const tweetId = req.body.tweetId || '';
    const topReplyId = req.body.topReplyId || '';
    const subReplyId = req.body.subReplyId || '';

    const deviceId = fetchDeviceId(req);
    const pubStr = `phone==${phone}&&signature==${signature}&&deviceId==${deviceId}`;
    const aesStr = `userId==${userId}&&targetUserId==${targetUserId}&&tweetId==${tweetId}&&topReplyId==${topReplyId}&&subReplyId==${subReplyId}`;
    const dba = SecretKey.aesEncrypt256(aesStr, aesKeys);
    const token = SecretKey.nodeRSAEncryptWithPubKey(pubStr, pubKeys);

    try {
        const zanData = await agent.post(`${resApi.zhiBApi}/user/action/zan`, {
            timespan,
            raid
        }, {
            dba,
            token
        });
        // console.log(zanData, '==========='); 

        if (zanData.success) {
            return res.json({
                msg: '点赞 ok',
                success: true,
                data: zanData,
            });
        } else {
            return res.json({
                msg: 'ZIB不足，赶快分享到朋友圈吧～',
                success: false,
            });
        }
    } catch (err) {
        next(err);
    }
});

/**
 * 关注_取消关注某个用户
 * token(必须) 公钥加密的 deviceId, phone, signature
 dba(必须) aes 加密的 userId,toFollowUserId，action
 action 1 关注，-1 取消关注
 */
router.post('/action/follow', auth.requireUser, async (req, res, next) => {
    const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys);
    const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys);
    const userId = req.session.loginData.user.id;
    const phone = req.session.loginData.user.phone;
    const signature = req.session.loginData.signature;
    const toFollowUserId = req.body.toFollowUserId || '';
    const action = req.body.action || '';

    const deviceId = fetchDeviceId(req);
    const pubStr = `phone==${phone}&&signature==${signature}&&deviceId==${deviceId}`;
    const aesStr = `toFollowUserId==${toFollowUserId}&&action==${action}&&userId==${userId}`;

    try {
        const dba = SecretKey.aesEncrypt256(aesStr, aesKeys);
        const token = SecretKey.nodeRSAEncryptWithPubKey(pubStr, pubKeys);
        const followData = await agent.post(`${resApi.zhiBApi}/user/action/follow`, {
            timespan,
            raid
        }, {
            dba,
            token
        });
        // console.log(followData, '======followdata=====');

        if (followData.success) {
            return res.json({
                msg: '关注_取消 ok',
                success: true,
                data: followData.data,
            });
        } else {
            return res.json({
                msg: '关注失败',
                success: false,
            });
        }
    } catch (err) {
        next(err);
    }
});

/**
 * 获取用户的博文
 * 获取用户的博文
登录用户查看自己的博文，就不需要显示 是否关注了（系统默认用户关注了自己）
/user/tweet?timespan=xx&raid=xx
method: post
body
dba(必须) aes 加密的 page, limit, userId, otherUserId
1 登录用户 用户查看自己的所有博文 userId
2 登录用户 查看别人的所有博文 userId, otherUserId
3 未登录查看 otherUserId
 */
router.post('/user/tweet', wrapper(async (req, res) => {
    const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
    const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
    const userId = req.session.loginData && req.session.loginData.user.id
    const page = req.body.page || 1
    const limit = req.body.limit || 10
    const otherUserId = req.body.otherUserId || ''

    const aesStr = userId ? `page==${page}&&limit==${limit}&&otherUserId==${otherUserId}&&userId==${userId}` : `page==${page}&&limit==${limit}&&otherUserId==${otherUserId}`;
    const dba = SecretKey.aesEncrypt256(aesStr, aesKeys);

    const tweetData = await agent.post(`${resApi.zhiBApi}/user/tweet`, {
        timespan,
        raid
    }, {
        dba
    });
    // console.log(tweetData, '======tweetData=====');

    if (tweetData.success) {
        return res.json({
            msg: '获取用户博文成功',
            success: true,
            data: tweetData.data,
        });
    } else {
        return res.json({
            msg: '获取用户的博文失败',
            success: false,
        });
    }
}))

/**
 * 用户关注的用户的最新博文
/user/follow/tweet?timespan=xx&raid=xx
method: post
body
token(必须) 公钥加密的 deviceId, phone, signature
dba(必须) aes 加密的
page, 可选
limit, 可选
userId 必须
rtime 13为时间戳 首次为0
 */
router.post('/user/follow/tweet', auth.authUser, async (req, res) => {
    try {
        const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
        const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
        const userId = req.session.loginData.user.id
        const phone = req.session.loginData.user.phone;
        const signature = req.session.loginData.signature;
        const deviceId = fetchDeviceId(req);

        const page = req.body.page || 1
        const limit = req.body.limit || 10
        const rtime = req.body.rtime || 0 // 需要验证时间戳

        console.log(page, limit, rtime, '...///.......')
        const aesStr = `page==${page}&&limit==${limit}&&rtime==${rtime}&&userId==${userId}`;
        const pubStr = `deviceId==${deviceId}&&phone==${phone}&&signature==${signature}`;
        const dba = SecretKey.aesEncrypt256(aesStr, aesKeys);
        const token = SecretKey.nodeRSAEncryptWithPubKey(pubStr, pubKeys);
        
        const followData = await agent.post(`${resApi.zhiBApi}/user/follow/tweet`, {
            timespan,
            raid
        }, {
            dba,
            token
        });
        console.log(followData, '====1111用户关注的用户的最新博文1111=======');

        if (followData.success) {
            return res.json({
                msg: '获取最新博文成功',
                success: true,
                data: followData.data,
            });
        } else {
            return res.json({
                msg: '获取最新博文失败',
                success: false,
            });
        }
    } catch (err) {
        console.log(err, err.status)
    }
})

/**
 * user/action/isfollow
 * 当前用户是否已经关注了某个用户
/user/action/isfollow?timespan=xx&raid=xx
method: post
body
dba(必须) aes 加密的 userId,targetUserId
userId(必选) login user
targetUserId(必选) 目标用户 id
 */
router.post('/user/action/isfollow', wrapper(async(req, res) => {
    const userId = req.session.loginData.user.id;
    const targetUserId = req.body.targetUserId || '';
    console.log(targetUserId, '.......', userId)
    if (!targetUserId) {
        res.json({
            msg: '目标用户不能为空',
            success: false
        })
    }

    const isFollowData = await new Request('/user/action/isfollow', {
        userId,
        targetUserId
    }).post();
    console.log(isFollowData, '---3333----')
    if (isFollowData.success) {
        return res.json({
            msg: '成功关注了某个用户',
            success: true,
            data: isFollowData
        })
    } else {
        return res.json({
            msg: '关注用户失败',
            success: false
        })
    }
}))
/**
 * 登出
 /account/logout
 method: post
 */
router.post('/logout', auth.authUser, async (req, res) => {
    req.session.destroy()
    const jwtToken = req.cookies['jwt-did']
    await redis.delMulti([jwtToken])
    res.clearCookie('jwt-did', {
        path: '/'
    })
    res.json({
        success: true,
        msg: 'ok'
    })
})


export default router