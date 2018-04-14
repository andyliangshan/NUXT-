import { Router } from 'express'
import SecretKey from '../utils/encry/cryptoer'
import agent from '../utils/fetch/superAgent'
import validator from 'validator'
import {aesKeys, pubKeys} from '../config'
import {fetchDeviceId} from '../common/remote'
import auth from '../middlewares/auth'

const router = new Router()

const resApi = {
  zhiBApi: 'http://apitest.zhib.net'
}

/**
 * 吐槽接口
 * dba aes 加密 content, contact, userId
 * content(必须)
 * contact(必须)
 * userId(可选)，登录用户可传
 */
router.post('/tease', async (req, res) => {
  const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
  const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
  let userId
  if (req.session.loginData) {
    userId = req.session.loginData && req.session.loginData.user.id
  } else {
    userId = ''
  }
  console.log(userId, '........')
  const content = validator.trim(req.body.content || '')
  const contact = validator.trim(req.body.contact || '')
  if (!content) {
    return res.status(500).json({
      msg: '内容不能为空',
      success: false
    })
  }
  if (!contact) {
    return res.status(500).json({
      msg: '联系方式不能为空',
      success: false
    })
  }
  console.log(111, '........', content, contact)
  const aesStr = userId ? `userId==${userId}&&content==${content}&&contact==${contact}` : `content==${content}&&contact==${contact}`
  const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)
  const teaseData = await agent.post(`${resApi.zhiBApi}/util/feedback`, { timespan, raid }, { dba })
  console.log(teaseData, '........')
  if (teaseData.success) {
    res.json({
      msg: '吐槽成功',
      success: true
    })
  } else {
    return res.json({
      msg: '吐槽失败',
      success: false
    })
  }
})

/**
 * /util/locating?timespan=&raid=xxdba=xx
 * methdo: get
 * query
 * dba 加密的格式 的 post参数的 键值对 相同
 * dba aes 加密的 limit, page, 关键字，userId, 拼接方式 必须为 k==v&&k==v...
 * page（可选）
 * limit（可选）
 * userId（可选）如果用户已经登录，则必须传递；否则不需要传递
 * locating（必选）
 */
router.get('/locating', async (req, res) => {
  const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
  const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
  const userId = req.session.loginData && req.session.loginData.user.id
  const locating = req.query.locating || ''
  const page = req.query.page || ''
  const limit = req.query.limit || ''
  if (!validator.isInt(page)) {
    return res.status(500).json({
      msg: '页数应该是整数',
      success: false
    })
  }
  if (!validator.isInt(limit)) {
    return res.status(500).json({
      msg: '每页数据应该是整数',
      success: false
    })
  }
  const aesStr = userId ? `limit==${limit}&&page==${page}&&userId==${userId}&&locating==${locating}` : `limit==${limit}&&page==${page}&&locating==${locating}`
  const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)

  const locatingData = await agent.get(`${resApi.zhiBApi}/util/locating`, { timespan, raid, dba })
  if (locatingData.success) {
    return res.json({
      msg: '搜索成功',
      success: true,
      data: locatingData.data
    })
  } else {
    return res.json({
      msg: '搜索失败',
      success: false
    })
  }
})

/**
 * /util/locating/rcd
 * method: get
 * query
 * dba(必选) aes加密userId==xx&&deviceId==xx * 登录用户必须 拼接userId
 * 未登录用户不需要拼接userId，但格式必须一致
 */
router.get('/rcd', async (req, res) => {
  const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
  const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
  const userId = req.session.loginData && req.session.loginData.user.id
  const deviceId = fetchDeviceId(req)
  const aesStr = userId ? `userId==${userId}&&deviceId==${deviceId}` : `deviceId==${deviceId}`
  const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)
  const rcdData = await agent.get(`${resApi.zhiBApi}/util/locating/rcd`, { timespan, raid, dba })
  // console.log(rcdData, '===========')
  if (rcdData.success) {
    return res.json({
      msg: '数据获取成功',
      success: true,
      data: rcdData.data
    })
  } else {
    return res.json({
      msg: '数据获取错误',
      success: false
    })
  }
})

/**
 * 投诉举报
 * /user/complaint?timespan=xx&raid=xxx
 * method: post
 * body
 * token(必须) 公钥加密的 deviceId, phone, signature
 * dba(必须) aes 加密的 userId==xx&&tweetId==xx&&title
 */
router.post('/complaint', auth.requireUser, async (req, res) => {
  const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
  const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
  const userId = req.session.loginData.user.id
  const phone = req.session.loginData.user.phone
  const signature = req.session.loginData.signature
  const tweetId = req.body.tweetId || ''
  const title = req.body.title || ''
  if (!tweetId) {
    return res.status(500).json({
      msg: '博文ID不能为空',
      success: false
    })
  }
  if (!title) {
    return res.status(500).json({
      msg: '博文Title不能为空',
      success: false
    })
  }

  const deviceId = fetchDeviceId(req)
  const pubStr = `phone==${phone}&&signature==${signature}&&deviceId==${deviceId}`
  const aesStr = `userId==${userId}&&tweetId==${tweetId}&&title==${title}`
  const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)
  const token = SecretKey.nodeRSAEncryptWithPubKey(pubStr, pubKeys)

  const complaintData = await agent.post(`${resApi.zhiBApi}/user/complaint`, { timespan, raid }, { token, dba })
  // console.log(complaintData, '===========')
  if (complaintData.success) {
    return res.json({
      msg: '投诉举报成功',
      success: true,
      data: complaintData.data
    })
  } else {
    return res.json({
      msg: '投诉举报失败',
      success: false
    })
  }
})

/**
 * 获取推荐池的推荐用户
 * /util/ru/rcd
 * method: get
 * query
 * dba(必选) aes加密userId==xx&&deviceId==xx&&page==1&&limit==10 * 登录用户必须 拼接userId
 * 未登录用户不需要拼接userId，但格式必须一致
 * page,limit 可选
 */
router.get('/ru/rcd', async (req, res) => {
  const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
  const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
  const userId = req.session.loginData && req.session.loginData.user.id
  const deviceId = fetchDeviceId(req)
  const page = req.query.page || ''
  const limit = req.query.limit || ''
  if (!validator.isInt(page)) {
    return res.status(500).json({
      msg: '页数不能为空',
      success: false
    })
  }
  if (!validator.isInt(limit)) {
    return res.status(500).json({
      msg: '数据长度不能为空',
      success: false
    })
  }
  const aesStr = userId ? `userId==${userId}&&page==${page}&&limit==${limit}&&deviceId==${deviceId}` : `page==${page}&&limit==${limit}&&deviceId==${deviceId}`
  const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)
  const ruData = await agent.get(`${resApi.zhiBApi}/util/ru/rcd`, { timespan, raid, dba })
  console.log(ruData, '....')
  if (ruData.success) {
    return res.json({
      msg: '获取推荐用户成功',
      success: true,
      data: ruData.data
    })
  } else {
    return res.json({
      msg: '获取推荐用户失败',
      success: false
    })
  }
})
/**
 * 是否有强制更新的版本
 * /util/version/up
 * method: get
 * query
 * dba(必选) aes加密deviceId==xx&&version==xxx&&type==
 * 所有参数必选
 */
router.get('/version', async (req, res) => {
  const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
  const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
  const deviceId = fetchDeviceId(req)
  const version = validator.isInt(req.query.version || '')
  const type = req.query.type || ''
  const aesStr = `type==${type}&&page==${version}&&limit==${version}&&deviceId==${deviceId}`
  const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)
  const versionData = await agent.get(`${resApi.zhiBApi}/util/version/up`, { timespan, raid, dba })
  // console.log(versionData, '===========')
  if (versionData.success) {
    return res.json({
      msg: '版本更新成功',
      success: true
    })
  } else {
    return res.json({
      msg: '版本更新失败',
      success: false
    })
  }
})

/**
 * 白皮书
 */
router.get('/baipishu.pdf', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, './book.pdf'));
  } catch (err) {
    next(err);
  }
});
export default router
