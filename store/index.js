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

        //--------------
        loginPhone: null,   // 登录的手机号码
        isUserNew: false,   // 是否是新注册用户
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