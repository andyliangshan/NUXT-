import { Router } from 'express'
import SecretKey from '../utils/encry/cryptoer'
import agent from '../utils/fetch/superAgent'
import validator from 'validator'
import {aesKeys, pubKeys, resApi} from '../config'
import {fetchDeviceId} from '../common/remote'
import qnStore from "../common/qnStore";
import logger from "../utils/log4js/index";
import localStore from "../common/localStore";
import auth from '../middlewares/auth'

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
     console.log('mmmmmmmmmm')
    const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
    const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
    const page = req.body.page || 1
    const limit = req.body.limit || 10
    const subLimit = req.body.subLimit || 10
    const userCols = req.body.userCols || ''
    const orderBy = req.body.orderBy || ''
    const subOrderBy = req.body.subOrderBy.join(',') || ''
    const userId = req.session.loginData && req.session.loginData.user.id
    const tweetId = validator.trim(req.body.tweetId || '')

    console.log('rerererererere')
    const aesStr = userId ? `limit==${limit}&&page==${page}&&tweetId==${tweetId}&&subLimit==${subLimit}&&userId==${userId}` : 
    `limit==${limit}&&page==${page}&&tweetId==${tweetId}&&subLimit==${subLimit}`
    const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)

    try {
        const replyListData = await agent.post(`${resApi.zhiBApi}/reply/list`, { timespan, raid }, { dba })
        console.log(replyListData, '------00ddddd00----')
        if (replyListData.success) {
            return res.json({
              msg: '单个博文获取成功',
              success: true,
              replyListData
            })
          } else {
            return res.json({
              msg: '单个博文获取失败',
              success: false
            })
          }
    } catch (err) {
        console(err)
    }

 })

 export default router