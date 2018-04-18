import fs from 'fs'
import util from 'util'
import path from 'path'
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
  const page = req.body.page || 1
    const limit = req.body.limit || 10
    const categoryId = validator.trim(req.body.categoryId || '')
    console.log('111')
  try {
    // const category = req.query.category || 0 
    // let category = null
    // if (req.query.category) {
    //   category = req.query.category
    // } else {
    //   category = 0
    // }
    // if (!validator.isNumeric(page)) {
    //   return res.status(500).json({
    //     msg: '页数应该是整数',
    //     success: false
    //   })
    // }
    // if (!validator.isNumeric(limit)) {
    //   return res.status(500).json({
    //     msg: '每页数据应该是整数',
    //     success: false
    //   })
    // }
    console.log('222')
    const aesStr = userId ? `page==${page}&&limit==${limit}&&userId==${userId}&&categoryId==${categoryId}` : `page==${page}&&limit==${limit}&&categoryId==${categoryId}`
    const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)
    const fallsData = await agent.post(`${resApi.zhiBApi}/tweet/falls`, { timespan, raid }, { dba })
    console.log(fallsData, '------1111----')
    // const resetSubNav = function (str = '全部') {
    //   let activeObj
    //   const res = categoryListData.data.filter(item => {
    //     if (item.name !== str) {
    //       return true
    //     } else {
    //       activeObj = item
    //       return false
    //     }
    //   })
    //   res.unshift(activeObj)
    //   return res
    // }
    // const currentCategoryVal = resetSubNav(str = category)
  
    if (fallsData.success) {
      return res.json({
        msg: '数据获取成功',
        success: true,
        data: fallsData.data
        // currentCategoryVal: currentCategoryVal
      })
    } else {
      return res.json({
        msg: '数据获取错误',
        success: false
      })
    }
  } catch (err) {
    console.log(err)
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

/**
 * ?timespan=&raid=xx&tid=xx&uid=xx
 *
 * 根据博文id获取博文信息
 * query
 tid(必须) aes 加密的 tweetId
 uid(登录用户必选) aes 加密的 userId
 */
router.get('/tweetInfo', async (req, res, next) => {
  console.log('11');
  const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys);
  const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys);
  const userId = req.session.loginData && req.session.loginData.user.id;
  const tweetId = validator.trim(req.query.tid || '');

  const uid = userId ? SecretKey.aesEncrypt256(userId, aesKeys) : '';
  const tid = SecretKey.aesEncrypt256(tweetId, aesKeys);

  try {
    const tweetData = userId ? await agent.get(`${resApi.zhiBApi}/tweet/info`, { timespan, raid, uid, tid })
      : await agent.get(`${resApi.zhiBApi}/tweet/info`, { timespan, raid, tid });

    console.log(tweetData, '======...dddddd..=====');

    if (tweetData.success) {
      return res.json({
        msg: '获取博文信息成功',
        success: true,
        data: tweetData.data
      });
    } else {
      return res.json({
        msg: '获取博文信息失败',
        success: false
      });
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * 发布博文
 *  toke(必须) 公钥加密的 deviceId, phone, signature
 *  dba aes 加密的 userId, content, images
 content 客户端字符限制
 images 为 abc.png,bb.png 多个图片地址 用 逗号分隔
 */
router.post('/put', auth.authUser, async (req, res, next) => {
  const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys);
  const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys);
  const userId = req.session.loginData.user.id;
  const phone = req.session.loginData.user.phone;
  const signature = req.session.loginData.signature;
  const contents = req.body.content;
  const images = req.body.images || '';

  if (!contents) {
    return res.status(500).json({
      msg: '内容不能为空',
      success: false
    });
  }

  const deviceId = fetchDeviceId(req);
  const pubStr = `phone==${phone}&&signature==${signature}&&deviceId==${deviceId}`;
  const aesStr = `content==${contents}&&images==${images.join(',')}&&userId==${userId}`;
  const dba = SecretKey.aesEncrypt256(aesStr, aesKeys);
  const token = SecretKey.nodeRSAEncryptWithPubKey(pubStr, pubKeys);

  try {
    const putData = await agent.post(`${resApi.zhiBApi}/tweet/put`, { timespan, raid }, { dba, token });
    // console.log(loginData, '===========');

    if (putData.success) {
      return res.json({
        msg: '博文发布成功',
        success: true
      });
    } else {
      return res.json({
        msg: '博文发布失败',
        success: false
      });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * 图片上传七牛
 */
router.post('/crpUpload', async (req, res)=> {
  let isFileLimit = false;
  let isOk = true;
  req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log(fieldname, file, filename, '...................');
    file.on('limit', function() {
      isFileLimit = true;
      logger.error('上传图片失败,超出限制大小' + filename);
      res.json({
        error: 1,
        success: false,
        msg: 'File size too large. Max is 1MB'
      })
    });

    localStore(file, { filename: filename }, function(err, result) {
      console.log(file, filename, '...........333333........');
      if (err) {
        isOk = false;
      }
      if (isFileLimit) {
        isOk = false;
      }
      if (!isOk) {
        logger.error('上传图片失败,错误信息:' + util.inspect(err));
        return res.json({
          error: 1,
          success: false,
          msg: '上传失败,网络错误',
        });
      }
      console.log(filename, result.url, '---------------');
    // ../upload/a5f70019ad238d0cf5ef3a2eb4d7763c.jpg
      qnStore.upload(fs.createReadStream(path.join(__dirname, result.url)), function(err, result) {
        if (err) {
          logger.error('骑牛上传图片失败,错误信息:' + util.inspect(err));
          console.log('upload qn error', err);
        } else {
          console.log('地址为: ', result);
          res.json({
            error: 0,
            success: true,
            url: result.url,
          });
        }
      });
    });
  });
  req.pipe(req.busboy);
});

/**
* 随机获取人工标记的精选内容
* /tweet/essence?timespan=xx&raid=xx
* method: post
* body
* dba： aes256(limit==10&&userId==xxx) * userId 登录状态时必选
* limit 随机的条数
*/
router.post('/essence', async (req, res) => { // auth.requireUser
  const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys);
  const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys);
  const limit = req.body.limit || 10
  const userId = req.session.loginData && req.session.loginData.user.id

  const aesStr = userId ? `limit==${limit}&&userId==${userId}` : `limit==${limit}`
  const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)
  try {
    const essenceData = await agent.post(`${resApi.zhiBApi}/tweet/essence`, { timespan, raid }, { dba })
    if (essenceData.success) {
      return res.status(200).json({
        msg: '获取人工标记的精选内容成功',
        success: true,
        essenceData
      });
    } else {
      return res.status(500).json({
        msg: '获取人工标记的精选内容失败',
        success: false,
      });
    }
  } catch (err) {
    console.log(err)
  }
})

/**
* 博文分享
* /tweet/sh?timespan=xx&raid=xx&tid=xx&did=xx
* method: get
* query
* tid aes 加密 tweetId
* did aes 加密的 deviceId
*/
router.get('/tweetSh', async(req, res) => {
  const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys);
  const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys);

  const tweetId = validator.trim(req.query.tid || '');
  const deviceId = fetchDeviceId(req)

  const did = SecretKey.aesEncrypt256(deviceId, aesKeys);
  const tid = SecretKey.aesEncrypt256(tweetId, aesKeys);

  try {
    const shareData = await agent.get(`${resApi.zhiBApi}/tweet/info`, { timespan, raid, did, tid });
    console.log(shareData, '======...dddddd..=====');

    if (shareData.success) {
      return res.json({
        msg: '博文分享成功',
        success: true,
        data: shareData
      });
    } else {
      return res.json({
        msg: '博文分享失败',
        success: false
      });
    }
  } catch (err) {
    console.log(err);
  }
})
export default router
