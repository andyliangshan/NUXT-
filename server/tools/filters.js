import moment from 'moment'
export const dynamicFormatTime = time => { // eslint-disable-line
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

export const aticleEstimatedCosts = (x1, x2, a = 40) => {
  // 文章收益：今日预估收益-已结算的实际收益之和
  // x1是文章总投票数，x2是文章总评论数
  // 第一天时 a = 40，之后a = 昨日发放的总ZIB数 / 昨日结算的总积分数
  const count = (((x1 ^ 0.8 + x2 ^ 0.8 / 2) * a) * 0.2) ^ 0.6;
  return count;
}

export const commentsCosts = (x1, x2, x3, x4, a = 40) => {
  // 评论收益：今日预估收益+已结算的实际收益之和
  // x1是文章总投票数，x2是文章总评论数
  // 第一天时 a = 40，之后a = 昨日发放的总ZIB数 / 昨日结算的总积分数
  /**
   * x1是评论的总投票数，x2是评论的总评论数
    x3是一级评论评论的次序，x4是该文章截止当前时间总的评论人数
    第一天时 a = 40，之后a = 昨日发放的总ZIB数 / 昨日结算的总积分数
   */
  const count = (((x1 ^ 0.8 + x2 ^ 0.8 / 2 + ((x4 - x3) / x1 ^ 1.1) ^ 0.5 / 2) * a) * 0.2) ^ 0.6;
  return count;
}