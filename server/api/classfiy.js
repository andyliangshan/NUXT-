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
 * 获取所有分类
 * /category/list?timespan=xxx&raid=xxx
 * method: get
 * query
 * dba 必须
 * aes加密的 deviceId==xxx&&page==1&&limit==10 格式
 **/
router.get('/categoryList', async (req, res) => {
  const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
  const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
  const page = req.query.page || ''
  const limit = req.query.limit || ''
  let category = null
  if (req.query.category) {
    category = req.query.category
  } else {
    category = '新闻'
  }
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
  const deviceId = fetchDeviceId(req)
  const aesStr = `limit==${limit}&&page==${page}&&deviceId==${deviceId}`
  const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)
  const categoryListData = await agent.get(`${resApi.zhiBApi}/category/list`, { timespan, raid, dba })
  // console.log(categoryListData, '.......')
  const resetSubNav = function (str = '新闻') {
    let activeObj
    const res = categoryListData.data.filter(item => {
      if (item.name !== str) {
        return true
      } else {
        activeObj = item
        return false
      }
    })
    res.unshift(activeObj)
    return res
  }
  const currentCategoryVal = resetSubNav(category)

  if (categoryListData.success) {
    return res.json({
      msg: '分类获取成功',
      success: true,
      data: categoryListData.data,
      currentCategoryVal: currentCategoryVal
    })
  } else {
    return res.json({
      msg: '分类获取失败',
      success: false
    })
  }
})

export default router