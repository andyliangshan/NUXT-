// import axios from '~/plugins/axios'
import { unsetToken } from '~/utils/auth';

export default {
    // 用户登录信息
    // userLoginInfo: async ({
    //     state
    // }, postData) => { // eslint-disable-line
    //     const userInfoData = await axios.post('/api/login', postData);
    //     state.userInfo = userInfoData;
    // },
    // increment: (state) => {
    //     state.counter++
    // },
    // getTweetInfoDetail: async ({
    //     state
    // }, query) => {
    //     console.log(this.$route.query, '........');
    //     const uid = location.pathname.match(/\w{8}-(\w{4}-){3}\w{12}/)[0]
    //     const bkData = await axios.get(`/api/tweetInfo?tid=${uid}`, {
    //         credentials: true
    //     })
    //     state.tweetInfoData = bkData;
    // },
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

    // login
    SET_USER (state, loggedUser) {
        state.userInfo = loggedUser || null
    },
    SET_LOGIN_PHONE (state, phone) {
        state.loginPhone = phone
    },
    LOGINOUT: state => {
        state.userInfo = null;
        unsetToken();
    },
}