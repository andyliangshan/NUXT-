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
    // 博文详情页面的数据信息
    GET_TWEET_DETAIL_ALL_DATA: (state, data) => {
        state.tweetInfoData = data;
    },
    // 获取博文列表页面数据
    GET_TWEET_LIST_DATA: (state, data) => {
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
}