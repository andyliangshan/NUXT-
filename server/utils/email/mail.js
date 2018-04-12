// import util from 'util';
import nodemailer from 'nodemailer';
import { mailOptions, mailTo } from '../../config';

// create reusable transporter object using the default SMTP transport
// {
//   service: 'gmail',
//     auth: {
//        user: 'gmail.user@gmail.com',
//        pass: 'yourpass',
//    },
// }
const transporter = nodemailer.createTransport(mailOptions);

// send mail with defined transport object
/**
 * opts Object ->
 * @param subject     string          邮件标题
 * @param from        string          邮件发送者  【xxx发送给to】
 * @param to          array/string    收件人
 * @param html        string          内容HTML模板
 * @param
 */
const sendMails = opts => {
  console.log(opts);
  return new Promise((resolve, reject) => {
    // setup email data with unicode symbols
    const { from = '【气象链】', subject = '【气象链】', to, html } = opts;
    const mailInfo = {
      // util.format('%s<%s>', from, mailOptions.auth.user);
      from: `"${from}" <${mailOptions.auth.user}>`, // sender address
      to,
      subject, // Subject line
      text: `知币网领取代码`, // plain text body
      html, // html body
    };
    transporter.sendMail(mailInfo, (error, info) => {
      if (error) {
        console.log(error);
        resolve(null);
      } else {
        console.log('Message %s sent: %s', info.messageId, info.response);
        resolve(1);
      }
    });
  });
};

export default sendMails;
