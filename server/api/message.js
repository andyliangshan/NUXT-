import { Router } from 'express'
import SecretKey from '../utils/encry/cryptoer'
import agent from '../utils/fetch/superAgent'
import {aesKeys, pubKeys, resApi} from '../config'
import { fetchDeviceId } from '../common/remote'
import auth from '../middlewares/auth'

const router = new Router()

/**
 *
 token(必须) 公钥加密的 deviceId, phone, signature
 dba(必须) aes 加密的 page, limit, userId
 */
router.post('/notice', auth.requireUser, async (req, res, next) => {
    const timespan = SecretKey.aesEncrypt256(Date.now() + '', aesKeys);
    const raid = SecretKey.aesEncrypt256(SecretKey.random(8), aesKeys);
  
    const userId = req.session.loginData.user.id || '';
    const phone = req.session.loginData.user.phone;
    const signature = req.session.loginData.signature;
  
    const deviceId = fetchDeviceId(req);
    const pubStr = `phone==${phone}&&signature==${signature}&&deviceId==${deviceId}`;
    const aesStr = `page==1&&limit==10&&userId==${userId}`;
    const dba = SecretKey.aesEncrypt256(aesStr, aesKeys);
    const token = SecretKey.nodeRSAEncryptWithPubKey(pubStr, pubKeys);
  
    try {
      const noticeData = await agent.post(`${resApi.zhiBApi}/user/notice`, { timespan, raid }, { dba, token });
      console.log(noticeData, '===========');
  
      if (noticeData.success) {
        return res.json({
          msg: 'ok',
          success: true,
          data: noticeData.data,
        });
      } else {
        return res.json({
          msg: 'error',
          success: false,
        });
      }
    } catch (err) {
      next(err);
    }
  });
  
  export default router