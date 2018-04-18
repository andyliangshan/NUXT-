export default {
    userAessetsInfo: state => state.userAessetsInfo, // 用户资产详细信息
    userBilldata: state => state.userBilldata, // 用户账单数据
    fansData: state => state.fansData, // 我的粉丝
    attentedData: state => state.attentedData, // 我的关注

    // auth
    isAuthenticated: state => !!state.userInfo,
    userInfo: state => state.userInfo,
}