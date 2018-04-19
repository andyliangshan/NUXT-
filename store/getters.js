export default {
    userAllInfoData: state => state.userAllInfoData, // 获取用户信息
    userAessetsInfo: state => state.userAessetsInfo, // 用户资产详细信息
    userBilldata: state => state.userBilldata, // 用户账单数据
    fansData: state => state.fansData, // 我的粉丝
    attentedData: state => state.attentedData, // 我的关注
    recommedUserData: state => state.recommedUserData, // 推荐  用户10条数据
    tweetRcdData: state => state.tweetRcdData, // 首页 推荐 文章 + 1条精选
    singleReplayListData: state => state.singleReplayListData, // 首页 推荐 单个回复列表
    tweetInfoData: state => state.tweetInfoData, // 获取博文详情页面数据
    tweetListData: state => state.tweetListData, // 获取博文列表页面数据
    otherUserMainInfoData: state => state.otherUserMainInfoData, // 获取其他用户个人主页数据
    userMainInfoData: state => state.userMainInfoData, // 获取主人用户个人主页数据
    noticeListData: state => state.noticeListData, // 消息列表数据
    cpsData: state => state.cpsData, // 举报成功数据
    cpsedData: state => state.cpsedData, // 被举报数据
    cpsnoData: state => state.cpsnoData, // 恶意举报数据

    //  --------
    isAuthenticated: state => !!state.userInfo,
    userInfo: state => state.userInfo,
}