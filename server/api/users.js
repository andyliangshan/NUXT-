import {
    Router
} from 'express';
import SecretKey from '../utils/encry/cryptoer';
import agent from '../utils/fetch/superAgent';
import validator from 'validator';
import {
    aesKeys,
    cookieConf
} from '../config';
import {
    fetchDeviceId
} from '../common/remote';
import redis from '../utils/redis/redisCache';
import requestIp from 'request-ip';
import auth from '../middlewares/auth';
import {
    Request
} from '../tools/request';
import {
    wrapper
} from '../tools/wrapper';

const router = new Router();

const resApi = {
    zhiBApi: 'http://apitest.zhib.net'
}

/**
 * 根据手机号码判断当前用户是否设置过密码
 */
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
    if (phoneData.success) {
        redis.set(`${deviceId}_store_phone`, phone, 60 * 5);
        redis.set(`${deviceId}_phoneData`, phoneData, 60 * 5);

        res.json({
            msg: '返回成功',
            data: phoneData.data
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
    const ip = requestIp.getClientIp(req);
    const deviceId = fetchDeviceId(req);
    const phone = await redis.get(`${deviceId}_store_phone`);

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
            httpOnly: false
        });
        res.cookie('uid', loginData.data.user.id, {
            // domain: '.zhib.net',
            path: '/',
            httpOnly: false
        });
        res.status(200).json({
            msg: 'ok',
            success: true,
            data: loginData.data.user.id
        });
    } else {
        res.status(500).json({
            msg: loginData.message,
            success: false
        });
    }
}));

// 获取验证码
router.post('/phoneCode', wrapper(async (req, res) => {
    const ip = requestIp.getClientIp(req);
    const deviceId = fetchDeviceId(req);
    const phone = await redis.get(`${deviceId}_store_phone`);
    const typeState = await redis.get(`${deviceId}_phoneData`);
    const type = typeState.password === 'false' ? 'password' : 'update';

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

    const phoneCode = req.body.phoneCode || '';
    const password = validator.trim(req.body.password || '');

    if (password && password.length < 6) {
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
        res.status(200).json({
            msg: '设置成功.',
            timeout: 60,
            phone: phone
        });
    } else {
        res.status(500).json({
            msg: '设置失败.'
        });
    }
}));

/**
 * /account/password
 * method: post
 * body
 * dba phone==xx&&phoneCode==xx&&password==xxx&&deviceId==xx&&ip==xxx&&from==xxx&&type==xxx
 * phone,phoneCode,password,deviceId 必须
 * ip web端必需， ios/android 无需传递
 * from 必须: pc, h5, ios, androd
 * type: 设置密码, 忘记密码为 password
 */
router.post('/account/password2', async (req, res) => { // auth.detectTimespan
    const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
    const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
    const ip = requestIp.getClientIp(req)
    const deviceId = fetchDeviceId(req)
    const phone = await redis.get(`${deviceId}_store_phone`)
    console.log('333', phone)

    const phoneCode = validator.trim(req.body.phoneCode || '')
    console.log('55', phoneCode)
    const password = validator.trim(req.body.password || '')
    console.log('22222222', password)
    if (phoneCode && !validator.isNumeric(phoneCode)) {
        return res.status(500).json({
            msg: '验证码错误',
            success: false
        })
    }
    if (password && password.length !== 8) {
        return res.status(500).json({
            msg: '密码错误',
            success: false
        })
    }

    const aesStr = `phone==${phone}&&phoneCode==${phoneCode}&&password==${password}&&deviceId==${deviceId}&&ip==${ip}&&from==pc&&type==password`
    const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)
    const accountData = await agent.post(`${resApi.zhiBApi}/account/password`, {
        timespan,
        raid
    }, {
        dba
    })
    console.log(accountData, '.......0000000.......')
    if (accountData.success) {
        return res.status(200).json({
            msg: '设置成功.',
            timeout: 60,
            phone: phone
        })
    } else {
        return res.status(500).json({
            msg: '设置失败.'
        })
    }
})

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
router.post('/account/password/update', async (req, res) => {
    console.log('ccccccccc')
    const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
    const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
    const deviceId = fetchDeviceId(req)
    const phone = await redis.get(`${deviceId}_store_phone`)
    console.log('333', phone)
    const phoneCode = validator.trim(req.body.phoneCode || '')
    console.log('55', phoneCode)
    const password = validator.trim(req.body.password || '')
    if (phoneCode && validator.isNumeric(phoneCode)) {
        return res.status(500).json({
            msg: '验证码错误',
            success: false
        })
    }
    if (password && password.length !== 8) {
        return res.status(500).json({
            msg: '密码错误',
            success: false
        })
    }
    console.log('22222222', password)
    const aesStr = `phone==${phone}&&password==${password}&&type==update&&phoneCode==${phoneCode}`

    const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)
    const accountData = await agent.post(`${resApi.zhiBApi}/account/password/update`, {
        timespan,
        raid
    }, {
        dba
    })
    console.log(accountData, '.......11.......')
    if (accountData.success) {
        return res.status(200).json({
            msg: '设置成功.',
            timeout: 60,
            phone: phone
        })
    } else {
        return res.status(500).json({
            msg: '设置失败.'
        })
    }
})

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
    res.clearCookie('uid', {
        path: '/'
    })
    res.redirect('/login')
})

export default router