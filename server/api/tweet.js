import fs from 'fs'
import util from 'util'
import path from 'path'
import {
    Router
} from 'express'
import SecretKey from '../utils/encry/cryptoer'
import agent from '../utils/fetch/superAgent'
import validator from 'validator'
import {
    aesKeys,
    pubKeys,
    qnAccess,
    resApi
} from '../config'
import {
    fetchDeviceId
} from '../common/remote'
import qnStore from '../common/qnStore';
import logger from '../utils/log4js/index';
import localStore from '../common/localStore';
import auth from '../middlewares/auth'

import {
    Request
} from '../tools/request';
import {
    wrapper
} from '../tools/wrapper';

import {
    AllHtmlEntities
} from 'html-entities';

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
        const fallsData = await agent.post(`${resApi.zhiBApi}/tweet/falls`, {
            timespan,
            raid
        }, {
            dba
        })
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
    try {
        const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys)
        const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys)
        const userId = req.session.loginData && req.session.loginData.user.id
        const page = req.body.page || 1
        const limit = req.body.limit || 10
        console.log(page, limit, '...........')
        const aesStr = userId ? `page==${page}&&limit==10&&userId==${userId}` : `page==${page}&&limit==10`
        const dba = SecretKey.aesEncrypt256(aesStr, aesKeys)
        const rcdData = await agent.post(`${resApi.zhiBApi}/tweet/rcd`, {
            timespan,
            raid
        }, {
            dba
        })
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
    } catch (err) {
        console.log(err)
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
    const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys);
    const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys);
    const userId = req.session.loginData && req.session.loginData.user.id;
    const tweetId = validator.trim(req.query.tid || '');

    const uid = userId ? SecretKey.aesEncrypt256(userId, aesKeys) : '';
    const tid = SecretKey.aesEncrypt256(tweetId, aesKeys);

    try {
        const tweetData = userId ? await agent.get(`${resApi.zhiBApi}/tweet/info`, {
                timespan,
                raid,
                uid,
                tid
            }) :
            await agent.get(`${resApi.zhiBApi}/tweet/info`, {
                timespan,
                raid,
                tid
            });

        // console.log(tweetData, '======...dddddd..=====');

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
 */
router.post('/tweet/put', auth.authUser, wrapper(async (req, res, next) => {
    const BOLD_MARKER = '\u200B\u200B';
    const BOLD_MARKER_SIZE = BOLD_MARKER.length;
    // 过滤博文内容
    let content = req.body.content.trim();
    // 将多个空格替换为1个
    content = content.replace(/\s{2,}/g, ' ');
    // 删除无用的 0 宽空格
    content = content.replace(/\u200B/g, '');
    // 将 <b>,</b>,<strong>,</strong> 标签替换为2个 \u200B （0宽空格），以便之后计算加粗的位置
    content = content.replace(/<b>|<\/b>|<strong><\/strong>/ig, BOLD_MARKER);
    // 将 <div> <br> 替换为 \n 换行
    content = content.replace(/(<div.*?>\s*)+|<br\s*\/?>/ig, '\n');
    // 删除所有的标签
    content = content.replace(/<\/?[a-zA-Z].*?>/g, '');

    // 如果是空内容，返回错误
    if (!content) {
        res.json({
            error: {
                msg: '内容不能为空'
            }
        });
        return;
    }

    const deviceId = fetchDeviceId(req);

    // **************
    // 检查分类是否存在
    // 由于当前没有检查分类是否存在的API，所以只能通过获取所有的分类到内存来处理
    // **************
    const categories = (await new Request('/category/list', {
        deviceId
    }).get()).data;

    if (!categories) {
        res.json({
            error: {
                msg: '无法验证博文分类'
            }
        });
        return;
    }

    const categoryId = req.body.categoryId;
    let foundCategory = false;
    categories.every(cate => {
        if (cate.id === categoryId) {
            foundCategory = true;
            return false;
        }

        return true;
    });

    if (!foundCategory) {
        let msg = categoryId ? '找不到对应的分类' : '缺少博文分类ID';
        res.json({
            error: {
                msg
            }
        });
        return;
    }

    // HTML entity code decode
    const entites = new AllHtmlEntities();
    content = entites.decode(content);

    // HTML entity 还原之后，还可能出现标签，再次替换
    content = content.replace(/<[a-z/]/g, function (matches) {
        return matches.replace('<', '< ');
    });

    // 计算文字加粗的位置
    const contentBold = [];
    let boldMarkerPos = content.indexOf(BOLD_MARKER);
    let boldBlockCounter = 0;
    while (boldMarkerPos >= 0) {
        // 开始标记位置
        let boldValue = (boldMarkerPos - boldBlockCounter * BOLD_MARKER_SIZE * 2) + ':';
        // 结束标记位置
        let boldMarkerEndPos = content.indexOf(BOLD_MARKER, boldMarkerPos + BOLD_MARKER_SIZE);
        // 如果没有找到结束标记，那么之后所有文字都是加粗（文本结束位置）
        if (boldMarkerEndPos === -1) {
            boldMarkerEndPos = content.length - 1;
        }

        // 加粗文字的长度
        let len = boldMarkerEndPos - boldMarkerPos - BOLD_MARKER_SIZE;
        boldValue += len;
        contentBold.push(boldValue);

        boldMarkerPos = content.indexOf(BOLD_MARKER, boldMarkerEndPos + BOLD_MARKER_SIZE);
        boldBlockCounter++;
    }

    // 替换加粗标记
    content = content.replace(new RegExp(BOLD_MARKER, 'g'), '');

    let images = req.body.images;
    // 如果有图片内容，则将图片的 key（七牛文件名）替换为完整URL
    if (images && Array.isArray(images)) {
        images.forEach(img => {
            img.url = qnAccess.origin + '/' + img.key;
            delete img.key;
        });
    } else {
        images = [];
    }

    const body = {
        content,
        contentBold,
        images
    };

    const userId = req.session.loginData.user.id

    const result = await new Request('/tweet/put', {
        categoryId,
        userId
    }, body).post();

    if (result.success) {
        res.json(result);
    } else {
        res.json({
            msg: '发布失败',
            success: false
        });
    }
}));

/**
 * 图片上传七牛
 */
router.post('/crpUpload', async (req, res) => {
    let isFileLimit = false;
    let isOk = true;
    req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log(fieldname, file, filename, '...................');
        file.on('limit', function () {
            isFileLimit = true;
            logger.error('上传图片失败,超出限制大小' + filename);
            res.json({
                error: 1,
                success: false,
                msg: 'File size too large. Max is 1MB'
            })
        });

        localStore(file, {
            filename: filename
        }, function (err, result) {
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
            qnStore.upload(fs.createReadStream(path.join(__dirname, result.url)), function (err, result) {
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
        const essenceData = await agent.post(`${resApi.zhiBApi}/tweet/essence`, {
            timespan,
            raid
        }, {
            dba
        })
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
router.get('/tweetSh', async (req, res) => {
    const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys);
    const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys);

    const tweetId = validator.trim(req.query.tid || '');
    const deviceId = fetchDeviceId(req)

    const did = SecretKey.aesEncrypt256(deviceId, aesKeys);
    const tid = SecretKey.aesEncrypt256(tweetId, aesKeys);

    try {
        const shareData = await agent.get(`${resApi.zhiBApi}/tweet/info`, {
            timespan,
            raid,
            did,
            tid
        });
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

/**
 * 删除博文
/user/action/deltweet?timespan=xx&raid=xx
method: post
query
token
dba(必须) aes 加密的 userId===xx&&tweetId==xxx
 */
router.post('/deltweet', wrapper(true, async (req, res) => {
    const userId = req.session.loginData.user.id;
    const tweetId = req.body.tweetId;
    const codeData = await new Request('/user/action/deltweet', {
        userId,
        tweetId
    }).post();
    if (codeData.success) {
        return res.json({
            msg: '删除博文成功',
            success: true
        })
    } else {
        return res.json({
            msg: '删除博文失败',
            success: false
        })
    }
}))
export default router