/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息
 */

import SMSClient from '@alicloud/sms-sdk';
import { inspect } from 'util';
import logger from '../log4js';

// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAIb1yn2GWumuw2';
const secretAccessKey = 'E8nH5Q4pjEM6hCMBdvn1RJnGrbuObr';

// 在云通信页面开通相应业务消息后，就能在页面上获得对应的queueName,不用填最后面一段
const queueName = 'Alicom-Queue-1038816685872490-';

// 初始化sms_client
const smsClient = new SMSClient({ accessKeyId, secretAccessKey });

/** 
 * 发送短信 
 * 请求参数：
 * phone        手机号码: 17610140799
 * SignName     短信头(default: 知币， 无特殊不需要传)
 * TemplateCode 短信模板: SMS_126290349 默认为验证码模板
 * TemplateParam    短信模板变量: {"code":"12345"}
 * 
 * 返回参数：
 * RequestId    请求ID
 * BizId        发送回执ID,可根据该ID查询具体的发送状态
 * 返回示例：
        Message: 'OK',
        RequestId: '992376B6-10CD-4093-B710-BEA50C454C8D',
        BizId: '134605819616303623^0',
        Code: 'OK'
*/
export const sendSMS = ({
  phone,
  signName = '知币',
  templateCode = 'SMS_126290349',
  templateParam, // `{"code":"12345"}`
}) =>
  new Promise(resolve => {
    smsClient
      .sendSMS({
        PhoneNumbers: phone,
        SignName: '知币',
        TemplateCode: 'SMS_126290349',
        TemplateParam: templateParam,
      })
      .then(
        res => {
          const { Code } = res;
          if (Code === 'OK') {
            // 处理返回参数
            console.log(res);
            resolve(true);
          }
        },
        err => {
          resolve(null);
          logger.error(`手机号码${phone}, 短信发送失败， error: ${inspect(err)}`);
          console.log(err);
        },
      );
  });

/**
 * 查询短信发送详情
 * 返回对象 { SmsSendDetailDTO: [{}, {}...] }, 
 * 返回参数示例：
       SendDate: '2018-02-26 11:38:23',
       SendStatus: 3,
       ReceiveDate: '2018-02-26 11:38:26',
       ErrCode: '0',
       TemplateCode: 'SMS_126290349',
       Content: '【知币】您的验证码：12345，您正进行身份验证，打死不告诉别人！',
       PhoneNum: '17610140799'
 */
export const queryDetail = ({ phone, sendDate, pageSize = 10, currentPage = 1 }) =>
  new Promise(resolve => {
    smsClient
      .queryDetail({
        PhoneNumber: phone,
        SendDate: sendDate,
        PageSize: pageSize,
        CurrentPage: currentPage,
      })
      .then(
        res => {
          const { Code, SmsSendDetailDTOs } = res;
          if (Code === 'OK') {
            // 处理发送详情内容
            console.log(SmsSendDetailDTOs);
            resolve(true);
          }
        },
        err => {
          // 处理错误
          resolve(null);
          logger.error(`查询${phone}, 于${sendDate}短信发送详情: error: ${inspect(err)}`);
          console.log(err);
        },
      );
  });

/**
 * type
 * 短信回执报告 0
 * 短信上行报告 1
 */
export const receiveMsg = ({ type }) =>
  new Promise(resolve => {
    smsClient.receiveMsg(type, queueName).then(
      res => {
        // 消息体需要base64解码
        const { code, body } = res;
        if (code === 200) {
          // 处理消息体,messagebody
          console.log(body);
          resolve(body);
        }
      },
      err => {
        console.log(err);
        logger(`查询 短信${type ? '上行' : '回执'}报告 失败.`);
        resolve(null);
      },
    );
  });
