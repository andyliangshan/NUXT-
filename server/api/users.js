import fs from 'fs';
import path from 'path';
import util from 'util';
import { Router } from 'express'
import SecretKey from '../utils/encry/cryptoer'
import agent from '../utils/fetch/superAgent'
import validator from 'validator'
import { aesKeys, cookieConf } from '../config'
import { fetchDeviceId } from '../common/remote'
import redis from '../utils/redis/redisCache'
import requestIp from 'request-ip'
import qnStore from "../common/qnStore";
import auth from '../middlewares/auth'

import { Request } from '../tools/request';
import { wrapper } from '../tools/wrapper';

const router = new Router()

// 验证手机号是否被注册
router.get('/valid/phone', wrapper(async (req, res) => {
    const phone = validator.trim(req.query.phone || '');

    if (!validator.isMobilePhone(phone, 'zh-CN')) {
      res.json({
        msg: '手机号码错误', success: true
      });

      return;
    }

    const deviceId = fetchDeviceId(req);
    const phoneData = await new Request('/util/valid/phone', {phone}).get();
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
    const ip = requestIp.getClientIp(req);
    const deviceId = fetchDeviceId(req);
    const phone = await redis.get(`${deviceId}_store_phone`);

    const loginData = await new Request('/account/login', {
        ip,
        phone,
        password,
        deviceId
    }).post();

    console.log(loginData, '...----555555----')
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
        return res.json({
            msg: '登录成功',
            success: true,
            data: loginData.data.user.id
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
    const phone = await redis.get(`${deviceId}_store_phone`);
    const typeState = await redis.get(`${deviceId}_phoneData`);
    const type = !!typeState.password ? 'update' : 'password';

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
    console.log(accountData, '----0000-----')

    if (accountData.success) {
        return res.json({
            msg: '设置密码成功.',
            timeout: 60,
            success: true
        });
    } else {
        return res.json({
            msg: '设置密码失败.',
            success: true
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
router.post('/account/password/update', wrapper(async (req, res) => {
  console.log('ccccccccc')
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
  const aesStr = `phone==${phone}&&password==${password}&&type==update&&phoneCode==${phoneCode}`

  const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)
  const accountData = await agent.post(`${resApi.zhiBApi}/account/password/update`, { timespan, raid }, { dba })
  console.log(accountData, '.......11.......')
  if (accountData.success) {
    return res.status(200).json({
      msg: '设置成功.',
      timeout: 60,
    })
  } else {
    return res.status(500).json({
      msg: '设置失败.'
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
    const infoData = await agent.post(`${resApi.zhiBApi}/user/updateInfo`, { timespan, raid }, { dba, token });
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

//  base64转图片
router.post('/base642img', async (req, res) => {
  req.busboy.on('field', function (key, value, keyTruncated, valueTruncated) {
    const base64Data = value.replace(/^data:image\/\w+;base64,/, '');
    const dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile(path.join(__dirname, `../upload/holeImg.png`), dataBuffer, function (err) {
      if (err) {
        res.json({
          code: -1,
          msg: err,
        });
      } else {
        // ../upload/a5f70019ad238d0cf5ef3a2eb4d7763c.jpg
        qnStore.upload(fs.createReadStream(path.join(__dirname, '../upload/holeImg.png')), function(err, result) {
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
