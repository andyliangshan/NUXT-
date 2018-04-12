import moment from 'moment'
export const dynamicFormatTime = time => {  // eslint-disable-line
  const diffNow = moment().diff(moment(time), 'seconds')
  let res
  if (diffNow < 10 * 60) {
    res = '刚刚'
  } else if (diffNow < 60 * 60) { // 1h nei
    res = moment().diff(moment(time), 'minutes') + '分钟前'; // eslint-disable-line
  } else if (diffNow < 60 * 60 * 24) {
    res = moment().diff(moment(time), 'hours') + '小时前'; // eslint-disable-line
  } else if (diffNow < 60 * 60 * 48) {
    res = '昨天'
  } else {
    res = moment(time).format('YYYY-MM-DD HH:MM')
  }
  return res
} // eslint-disable-line