import axios from '~/plugins/axios'

export default {
    // 获取用户信息
    GET_USER_INFO_DATA: async({ commit }) => {
        try {
            const userAllInfo = await axios.post('/api/userInfo');
            if (userAllInfo.data.success) {
               commit('USER_ALL_INFO', userAllInfo.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    },
    // 用户资产详细信息
    GET_USER_ASSETS_INFO_DATA: async({ commit }) => {
        try {
            const userAessetsInfo = await axios.post('/api/assets/info');
            if (userAessetsInfo.data.success) {
               commit('USER_AESSETS_INFO', userAessetsInfo.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    },
    // 用户账单信息
    GET_BILL_INFO_DATA: async({ commit }) => {
        try {
            const billInfoData = await axios.post('/api/bill');
            if (billInfoData.data.success) {
               commit('USER_BILL_INFO', billInfoData.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    },
    // 我的粉丝
    MY_FANS: async({ commit }) => {
        try {
            const fansData = await axios.post('/api/fans');
            if (fansData.data.success) {
               commit('MY_FANS_DATA', fansData.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    },
    // 我的关注
    MY_ATTENTED: async({ commit }) => {
        try {
            const attentedData = await axios.post('/api/user/follow');
            if (attentedData.data.success) {
               commit('MY_ATTENTED_DATA', attentedData.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    },
    // 首页 推荐 用户10条数据
    RECOMMEND_USER_TEN_DATA: async({ commit }) => {
        try {
            const recommedUserData = await axios.get('/api/ru/rcd');
            if (recommedUserData.data.success) {
               commit('MAIN_RECOMMEND_TEN_DATA', recommedUserData.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    },
    // 首页 推荐文章 + 1条精选
    RECOMMEND_ATICLE_SPECAL_DATA: async({ commit }) => {
        try {
            const tweetRcdData = await axios.post('/api/tweet/rcd');
            if (tweetRcdData.data.success) {
               commit('RECOMMEND_ATICLE_SPECAL', tweetRcdData.data.rcdData.data)
            }
        } catch (err) {
            console.log(err)
        }
    },
    // 首页 单个回复列表
    SINGLE_REPLAY_LIST: async({ commit }, tweetId) => {
        try {
            const replyListData = await axios.post('/api/replyList', { tweetId: tweetId });
            if (replyListData.data.success) {
               commit('MAIN_SINGLE_REPLAY_DATA', replyListData.data.data.rows)
            }
        } catch (err) {
            console.log(err)
        }
    },
    // 获取博文详情页面数据
    GET_TWEET_DETAIL_DATA: async({ commit }, tweetId) => {
        try {
            const tweetInfoData = await axios.get(`/api/tweetInfo?tid=${tweetId}`);
            if (tweetInfoData.data.success) {
               commit('GET_TWEET_DETAIL_ALL_DATA', tweetInfoData.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    },
    // 获取其他用户个人主页数据
    GET_OTHER_USER_INFO_DATA: async({ commit }, userId) => {
        try {
            const otherUserInfoData = await axios.post('/api/userInfo', { userId: userId });
            if (otherUserInfoData.data.success) {
               commit('GET_OTHER_USER_INFO_ALL_DATA', otherUserInfoData.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    },
    // 获取主人用户个人主页数据
    GET_MASTER_INFO_DATA: async({ commit }, userId) => {
        try {
            const masterInfoData = await axios.post('/api/userInfo', { userId: userId });
            if (masterInfoData.data.success) {
               commit('SET_USER', masterInfoData.data.data)
            }
            return masterInfoData.data
        } catch (err) {
            console.log(err)
        }
    },
}