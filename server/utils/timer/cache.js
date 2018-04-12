/**
 Job running schedule details:

 +-----------------------+-------------------------------+-----------+
 |       Time            |          Job说明               |   Type    |
 +-----------------------+-------------------------------+-----------+
 |   0am Every Day       | xxxxxxxxxxxxxxxxxxxxxxxxxxxxx | xxxxxxxxx |
 +-----------------------+-------------------------------+-----------+
 * */

import cron from 'cron';

const CronJob = cron.CronJob; // eslint-disable-line

//  */10 * * * * *
//  00 00 00 * * *  每天凌晨
const job = new CronJob(
  '00 00 00 * * *',
  async () => {
    console.log('timer');
  },
  null,
  true,
  'Asia/Shanghai',
);
void job; // eslint-disable-line
