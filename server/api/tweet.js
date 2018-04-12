import { Router } from 'express'
import SecretKey from '../utils/encry/cryptoer'
import agent from '../utils/fetch/superAgent'
import validator from 'validator'
import {aesKeys} from '../config'
import {fetchDeviceId} from '../common/remote'

const router = new Router()

const resApi = {
  zhiBApi: 'http://apitest.zhib.net'
}

/**
 * 博文阅读曝光
 * /tweet/vw?timespan=xx&raid=xx&tid=xx&did=xx
 * method: get
 * query
 * tid(必须) aes 加密的 tweetId
 * did(必须) aes 加密的 deviceId
 */

/**
 * /tweet/falls?timespan=xx&raid=xx
 * method: post
 * body
 * dba： aes256(page==1&&limit==10&&userId==xxx&&categoryId==xxx) * userId 登录状态时必选
 */
router.post('/falls', async (req, res) => {
  const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
  const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
  const userId = req.session.loginData && req.session.loginData.user.id
  const page = req.body.page || ''
  const limit = req.body.limit || ''
  const categoryId = validator.trim(req.body.categoryId || '')
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
  const aesStr = userId ? `page==${page}&&limit==${limit}&&userId==${userId}&&categoryId==${categoryId}` : `page==${page}&&limit==${limit}&&categoryId==${categoryId}`
  const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)
  const fallsData = await agent.post(`${resApi.zhiBApi}/tweet/falls`, { timespan, raid }, { dba })
  console.log(fallsData, '----------')
  if (fallsData.success) {
    return res.json({
      msg: '数据获取成功',
      success: true,
      data: fallsData.data
    })
  } else {
    return res.json({
      msg: '数据获取错误',
      success: false
    })
  }
})

/**
 * 推荐栏目博文+1条人工精选
 * /tweet/rcd?timespan=xx&raid=xx
 * method: post
 * body
 * dba： aes256(page==1&&limit==10&&userId==xxx) * userId 登录状态时必选
 */
router.post('/tweet/rcd', async (req, res) => {
  const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
  const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
  const userId = req.session.loginData && req.session.loginData.user.id
  // const page = req.body.page || ''
  // const limit = req.body.limit || ''
  // console.log(page, limit, '...........')
  // if (!validator.isInt(page)) {
  //   return res.status(500).json({
  //     msg: '页数应该是整数',
  //     success: false
  //   })
  // }
  // if (!validator.isInt(limit)) {
  //   return res.status(500).json({
  //     msg: '每页数据应该是整数',
  //     success: false
  //   })
  // }
  const aesStr = userId ? `page==1&&limit==10&&userId==${userId}` : 'page==1&&limit==10'
  const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)
  const rcdData = await agent.post(`${resApi.zhiBApi}/tweet/rcd`, { timespan, raid }, { dba })
  // console.log(rcdData, '----------')
  if (rcdData.success) {
    res.json({
      msg: '推荐栏目数据获取成功',
      success: true,
      rcdData
    })
  } else {
    res.json({
      msg: '推荐栏目数据获取错误',
      success: false
    })
  }
})

export default router
