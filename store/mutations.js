// import axios from '~/plugins/axios'
import {
    unsetToken
} from '~/utils/auth';

export default {
    // 获取用户信息
    USER_ALL_INFO: (state, data) => {
        state.userAllInfoData = data;
    },
    // 用户资产详细信息
    USER_AESSETS_INFO: (state, data) => {
        state.userAessetsInfo = data;
    },
    // 用户账单信息
    USER_BILL_INFO: (state, data) => {
        state.userBilldata = data;
    },
    // 我的粉丝
    MY_FANS_DATA: (state, data) => {
        state.fansData = data;
    },
    // 我的关注
    MY_ATTENTED_DATA: (state, data) => {
        state.attentedData = data;
    },
    // 首页 推荐 用户10条数据
    MAIN_RECOMMEND_TEN_DATA: (state, data) => {
        state.recommedUserData = data;
    },
    // 首页 推荐文章 + 1条精选
    RECOMMEND_ATICLE_SPECAL: (state, data) => {
        state.tweetRcdData = data;
    },
    // 首页 单个回复列表
    MAIN_SINGLE_REPLAY_DATA: (state, data) => {
        state.singleReplayListData = data;
    },
    // 二级 回复列表
    LEVEL_REPLAY_ALL_DATA: (state, data) => {
        state.levelReplayListData = data;
    },
    // 博文详情页面的数据信息
    GET_TWEET_DETAIL_ALL_DATA: (state, data) => {
        state.tweetInfoData = data;
    },
    // 获取博文列表页面数据
    GET_TWEET_LIST_DATA: (state, data) => {
        // if (!state.tweetListData) {
        //     state.tweetListData = data;
        // } else {
        //     data.forEach(tweet => state.tweetListData.push(tweet));
        // }
        state.tweetListData = data;
    },
    // 获取其他用户个人主页数据
    GET_OTHER_USER_INFO_ALL_DATA: (state, data) => {
        state.otherUserMainInfoData = data;
    },
    // 获取主人用户个人主页数据
    GET_MASTER_INFO_ALL_DATA: (state, data) => {
        state.userMainInfoData = data;
    },
    // ------------------
    SET_USER(state, loggedUser) {
        state.userInfo = loggedUser || null
    },
    SET_LOGIN_PHONE(state, phone) {
        state.loginPhone = phone
    },
    SET_USER_NEW(state, isNew) {
        state.isUserNew = isNew;
    },
    LOGINOUT: state => {
        state.userInfo = null;
        unsetToken();
    },
    SET_ZAN(state, zanCount, userId) {
        state.tweetInfoData.zanCount = zanCount;
        state.tweetInfoData.iszan = {
            userId
        };
    },
    SET_FOLLOWED(state, followUserId) {
        state.tweetInfoData.isfollow = {
            followUserId
        };
    },
    // 消息列表数据
    NOTICE_LIST_DATA: (state, data) => {
        state.noticeListData = data
    },
    // 消息列表数据
    NOTICE_DATA: (state, data) => {
        state.noticeData = data
    },
    // 消息未读数量
    NOTICE_COUNT: (state, data) => {
        state.noticeCount = data
    },
    // 删除某一条数据重置
    spliceData(state, dataName, index) {
        state[dataName] = state[dataName].splice(index, 1)
    },
    // 举报成功
    CPS_DATA: (state, data) => {
        state.cpsData = data
    },
    // 被举报
    CPSED_DATA: (state, data) => {
        state.cpsedData = data
    },
    // 恶意举报
    CPS_NO_DATA: (state, data) => {
        state.cpsnoData = data
    },
    // 是否关注了某个用户
    IS_FOLLOW_STATE: (state, data) => {
        state.isFollowState = data
    },
    // 用户关注的博文列表数据
    USER_FOLLOW_TWEET_LIST_DATA: (state, data) => {
        state.userFollowListData = data
    },
    // 分类数据
    CATEGORY_DATA: (state, data) => {
        state.categoryData = data
    },
    // 分类列表数据
    CATEGORY_LIST_DATA: (state, data) => {
        state.categoryListData = data
    },
    // 是否有举报信息 isCps
    CPS_INFO: (state, iscp) => {
        state.isCps = iscp
    },
    // 是否有被举报信息 isCpsed
    CPSED_INFO: (state, iscped) => {
        state.isCpsed = iscped
    },
    // 是否有恶意举报信息 isCpsNo
    CPSNO_INFO: (state, iscpNo) => {
        state.isCpsNo = iscpNo
    },
}