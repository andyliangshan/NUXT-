/* eslint-disable */
import Vuex from 'vuex'
import Vue from 'vue'
import createLogger from 'vuex/dist/logger'
import Vue2TouchEvents from 'vue2-touch-events'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);
Vue.use(Vue2TouchEvents);

const store = () => new Vuex.Store({
    state: {
        counter: 0,
        userInfo: null,
        userAllInfoData: null,
        tweetInfoData: null,
        userAessetsInfo: null,
        userBilldata: [],
        fansData: [],
        attentedData: [],
        recommedUserData: [],
        tweetRcdData: null,
        singleReplayListData: [],
        otherUserMainInfoData: null,
        userMainInfoData: null,
        tweetListData: null,
        noticeListData: null,

        everyDataCoinZIB: null,
        cpsData: null,
        cpsedData: null,
        cpsnoData: null,

        isFollowState: null,
        userFollowListData: [],

        categoryData:[],
        categoryListData: [],
        noticeData: {},
        noticeCount: '',

        //--------------
        loginPhone: null,   // 登录的手机号码
        isUserNew: false,   // 是否是新注册用户

        isCps: false, // 是否举报成功信息
        isCpsed: false, // 是否被举报信息
        isCpsNo: false, // 是否有恶意举报信息
    },
    mutations,
    actions,
    getters,
    strict: process.env.NODE_ENV === 'development',
    plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : []
})
// if (!process.SERVER_BUILD) {
//     if (window.__INITIAL_STATE__) {
//         store.replaceState(window.__INITIAL_STATE__)
//     }
// }

export default store