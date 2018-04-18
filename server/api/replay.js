import { Router } from 'express'
import SecretKey from '../utils/encry/cryptoer'
import agent from '../utils/fetch/superAgent'
import validator from 'validator'
import {aesKeys, pubKeys, resApi} from '../config'
import {fetchDeviceId} from '../common/remote'
import qnStore from "../common/qnStore";
import logger from "../utils/log4js/index";
import localStore from "../common/localStore";
import auth from '../middlewares/auth';
import redis from '../utils/redis/redisCache'
import {
  Request
} from '../tools/request';
import {
  wrapper
} from '../tools/wrapper';

const router = new Router()

/**
 * 获取单个博文的回复列表
 * /reply/list?timespan=xx&raid=xx
 *  * method: post
 * body
 * dba(必须) aes 加密的 limit=10, page=1,tweetId,subLimit=10,userId
 * limit(可选)
 * page(可选)
 * subLimit(可选) 二级回复的条数，默认 10
 * orderBy(可选)
 * subOrderBy(可选)
 * userCols(可选) 需要用户的字段信息 逗号分隔，默认：id,nickName,avatarImage,phone
 * tweetId(必选)
 * userId(当用户已经登录，必选)
 */

 router.post('/replyList', async(req, res) => {
    const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
    const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
    const page = req.body.page || 1
    const limit = req.body.limit || 10
    const subLimit = req.body.subLimit || 10
    const userCols = req.body.userCols || ''
    const orderBy = req.body.orderBy || ''
    const subOrderBy = req.body.subOrderBy || ''
    const userId = req.session.loginData && req.session.loginData.user.id
    const tweetId = validator.trim(req.body.tweetId || '')

    const aesStr = userId ? `limit==${limit}&&page==${page}&&tweetId==${tweetId}&&subLimit==${subLimit}&&userId==${userId}` : 
    `limit==${limit}&&page==${page}&&tweetId==${tweetId}&&subLimit==${subLimit}`
    const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)

    try {
        const replyListData = await agent.post(`${resApi.zhiBApi}/reply/list`, { timespan, raid }, { dba })
        console.log(replyListData, '------00ddddd00----')
        if (replyListData.success) {
            return res.json({
              msg: '回复列表获取成功',
              success: true,
              data: replyListData.data
            })
          } else {
            return res.json({
              msg: '回复列表获取失败',
              success: false
            })
          }
    } catch (err) {
        console.log(err)
    }
 })

 /**
  * 获取单个博文的二级回复列表
/reply/level?timespan=xx&raid=xx
method: post
body
dba(必须) aes 加密的 limit=10, page=1,topReplyId=?
limit(可选)
page(可选)
orderBy(可选)
userCols(可选) 需要用户的字段信息 逗号分隔，默认：id,nickName,avatarImage,phone
topReplyId(必选) 顶级回复的id
*/
router.post('/replyLevel', wrapper(true, async(req, res) => {
  const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
  const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
  const page = req.body.page || 1
  const limit = req.body.limit || 10
  const topReplyId = req.body.topReplyId || ''

  const userCols = req.body.userCols || ''
  const orderBy = req.body.orderBy || ''

  if (!topReplyId) {
    return res.json({
      msg: '回复者的ID不能为空',
      success: false
    })
  }
  const subReplayListData = await new Request('/reply/level', {
    page,
    limit,
    topReplyId,
    userCols,
    orderBy
  }).post();

  console.log(subReplayListData, '------00ddddd00----')
  if (subReplayListData.success) {
      return res.json({
        msg: '二级回复列表获取成功',
        success: true,
        data: subReplayListData.data
      })
    } else {
      return res.json({
        msg: '二级回复列表获取失败',
        success: false
      })
    }
}))

/**
 * /reply/put?timespan=xx&raid=xx
* method: post
* body
* toke(必须) 公钥加密的 deviceId, phone, signature
* dba(必须) aes 加密的 content=10, userId，replyForTweetId,tweetId,relateReplyId, masterId
* replyForTweetId(可选) 顶级回复的 id：如果是二级回复 则必选
* 二级回复 回复 顶级回复
* replyForTweetId 代表的就是 顶级回复的 id
* relateReplyId(可选) 关联的二级回复的 id：如果是二级回复 则必选
* 丽人甲 回复 路人乙 ： 你好
* relateReplyId 代表的就是 路人乙的回复 id
* tweetId(必选) 涉及的博文 id
* masterId(必选) 涉及 被回复的 用户的id
* userId(必选) 登录用户的id
* content(必选) 回复内容
 */
router.post('/replyPut', auth.authUser, async(req, res) => {
  try {
    const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
    const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
    const deviceId = fetchDeviceId(req);
    const userId = req.session.loginData.user.id;
    const phone = req.session.loginData.user.phone;
    const signature = req.session.loginData.signature;

    const content = req.body.content || ''
    const replyForTweetId = req.body.replyForTweetId || ''
    const tweetId = req.body.tweetId || ''
    const relateReplyId = req.body.relateReplyId || ''
    const masterId = req.body.masterId || ''

    const pubStr = `deviceId==${deviceId}&&phone==${phone}&&signature==${signature}`
    const aesStr = `userId==${userId}&&content==${content}&&replyForTweetId==${replyForTweetId}&&tweetId==${tweetId}&&relateReplyId==${relateReplyId}&&masterId==${masterId}`

    const dba = SecretKey.aesEncrypt256(aesStr, aesKeys);
    const token = SecretKey.nodeRSAEncryptWithPubKey(pubStr, pubKeys);

    const replyData = await agent.post(`${resApi.zhiBApi}/reply/put`, { timespan, raid }, { token, dba })
    console.log(replyData, '....ply...')

    if (replyData.data.success) {
      return res.json({
        msg: '回复评论成功',
        success: true,
        data: replyData.data
      })
    } else {
      return res.json({
        msg: '回复评论失败',
        success: false
      })
    }
  } catch (err) {
    console.log(err)
  }
})

 export default router