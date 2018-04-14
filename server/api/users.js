import { Router } from 'express'
import SecretKey from '../utils/encry/cryptoer'
import agent from '../utils/fetch/superAgent'
import validator from 'validator'
import { aesKeys, cookieConf } from '../config'
import { fetchDeviceId } from '../common/remote'
import redis from '../utils/redis/redisCache'
import requestIp from 'request-ip'
import auth from '../middlewares/auth'

const router = new Router()
const resApi = {
  zhiBApi: 'http://apitest.zhib.net'
}
/**
 * 根据手机号码判断当前用户是否设置过密码
 * /util/valid/phone
 * method: get
 * query
 * dba(必选) aes加密phone==xxxx&&from==ios/android/pc/h5
 * 所有参数必选
 */
router.get('/valid/phone', async (req, res) => {
  const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
  const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
  const phone = validator.trim(req.query.phone || '')
  if (!validator.isMobilePhone(phone, 'zh-CN')) {
    return res.json({
      msg: '手机号码错误', success: true
    })
  }
  const deviceId = fetchDeviceId(req)
  const aesStr = `phone==${phone}&&from==pc`
  const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)
  const phoneData = await agent.get(`${resApi.zhiBApi}/util/valid/phone`, { timespan, raid, dba })
  // console.log(phoneData, '....33333...')

  if (phoneData.success) {
    redis.set(`${deviceId}_store_phone`, phone, 60 * 5)
    redis.set(`${deviceId}_phoneData`, phoneData, 60 * 5)
    return res.json({
      msg: '返回成功',
      data: phoneData.data
    })
  } else {
    return res.json({
      msg: '返回错误',
      success: false
    })
  }
})

// 用户登录
/**
 * phone(必须) 手机号码
 * deviceId(必须) 设备唯一标识
 * password(必须) 登录密码
 * from(必须) 可取值：pc, h5，ios，android
 * ip: 客户端ip地址，web端必须， ios/android 无需传递
 */
router.post('/login', async (req, res) => { // auth.detectTimespan
  const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
  const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
  const password = validator.trim(req.body.password || '')
  console.log('llllllllllll', password)
  const ip = requestIp.getClientIp(req)
  // const isValidateRegister = req.body.isValidateRegister

  const deviceId = fetchDeviceId(req)
  const phone = await redis.get(`${deviceId}_store_phone`)
  console.log(phone, '........')
  let aesStr = `ip==${ip}&&phone==${phone}&&password==${password}&&deviceId==${deviceId}&&from==pc`
  // if (isValidateRegister) {
  //   aesStr += `&&isValidateRegister==${isValidateRegister}`
  // }
  const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)
  console.log('111')

  const loginData = await agent.post(`${resApi.zhiBApi}/account/login`, { timespan, raid }, { dba })
  console.log(loginData, '-------------------登陆数据返回-------------------')

  if (loginData && loginData.success) {
    // { signature, user: {} }
    req.session.loginData = loginData.data
    const encDid = SecretKey.aesEncrypt256(deviceId, aesKeys)
    redis.set(encDid, loginData.data, cookieConf.timeout / 1000)
    // generate cookie
    res.cookie('jwt-did', encDid, {
      // domain: '.zhib.net',
      path: '/',
      maxAge: cookieConf.timeout,
      httpOnly: false
    })
    res.cookie('uid', loginData.data.user.id, {
      // domain: '.zhib.net',
      path: '/',
      httpOnly: false
    })
    return res.status(200).json({
      msg: 'ok',
      success: true,
      data: loginData.data.user.id
    })
  } else {
    return res.status(500).json({
      msg: loginData.message,
      success: false
    })
  }
})
// 获取验证码
/**
 * dba(必须) aes 加密的字符串原字符串 连接规则：key==value&&key==vlaue&&key==value......
 * 原字符串 参数 key 列表
 * phone(必须) 手机号码 11 位手机号码
 * phonePreCaptcha(必须) 手机号码验证 关联的 4 位图片数字验证码 已遗弃
 * deviceId(必须) 设备的唯一标识：web 页面可使用 sessionId
 * phoneCountryCode(可选) 手机号码国家代码 默认 +86
 * country(可选) 手机号码国家简称 默认 cn
 * ip: 客户端ip地址，web端必须， ios/android 无需传递
 * type: 发送类型：
 * 设置密码, 忘记密码为 password; type: 'update',
 */
router.post('/phoneCode', async (req, res) => {
  const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
  const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
  // const phoneCountryCode = validator.trim(req.body.phoneCountryCode || '+86')
  // const country = validator.trim(req.body.country || 'cn')
  const ip = requestIp.getClientIp(req)

  const deviceId = fetchDeviceId(req)
  const phone = await redis.get(`${deviceId}_store_phone`)
  const typeState = await redis.get(`${deviceId}_phoneData`)
  console.log('22222222', phone, typeState)
  let type = ''
  if (typeState.password === 'false') {
    type = 'password'
  } else {
    type = 'update'
  }
  const aesStr = `phone==${phone}&&deviceId==${deviceId}&&type==${type}&&ip==${ip}`
  const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)
  const CodeData = await agent.post(`${resApi.zhiBApi}/util/phoneCode`, { timespan, raid }, { dba })
  console.log(CodeData, '.......1111111.......')
  if (CodeData.success) {
    return res.status(200).json({
      msg: '发送成功.',
      timeout: 60,
      phone: phone
    })
  } else {
    return res.status(500).json({
      msg: '发送失败.'
    })
  }
})
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
router.post('/account/password', async (req, res) => { // auth.detectTimespan
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
  const accountData = await agent.post(`${resApi.zhiBApi}/account/password`, { timespan, raid }, { dba })
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
  const accountData = await agent.post(`${resApi.zhiBApi}/account/password/update`, { timespan, raid }, { dba })
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
