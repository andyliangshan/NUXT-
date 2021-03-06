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
               return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err)
            return false;
        }
    },
    // 用户账单信息
    GET_BILL_INFO_DATA: async({ commit }) => {
        try {
            const billInfoData = await axios.post('/api/bill');
            if (billInfoData.data.success) {
               commit('USER_BILL_INFO', billInfoData.data.data)
               return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err)
            return false;
        }
    },
    // 我的粉丝
    MY_FANS: async({ commit }, otherUserId) => {
        try {
            const fansData = await axios.post('/api/fans', otherUserId);
            if (fansData.data.success) {
               commit('MY_FANS_DATA', fansData.data.data)
            }
        } catch (err) {
            console.log(err)
        }
    },
    // 我的关注
    MY_ATTENTED: async({ commit }, otherUserId) => {
        try {
            const attentedData = await axios.post('/api/user/follow', otherUserId);
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
    RECOMMEND_ATICLE_SPECAL_DATA: async({ commit }, { page, limit }) => {
        try {
            const tweetRcdData = await axios.post('/api/tweet/rcd', { page: page, limit: limit });
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
    // 二级 回复列表
    LEVEL_REPLAY_LIST: async({ commit }, { page, limit, topReplyId }) => {
        try {
            const levelReplyListData = await axios.post('/api/replyLevel', { page: page, limit: limit, topReplyId: topReplyId });
            if (levelReplyListData.data.success) {
               commit('LEVEL_REPLAY_ALL_DATA', levelReplyListData.data.data.rows)
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
    // 获取博文列表页面数据
    GET_TWEET_LIST_ALL_DATA: async({ commit }, { page, limit, otherUserId }) => {
        try {
            const tweetListData = await axios.post('/api/user/tweet', { page: page, limit: limit, otherUserId: otherUserId });
            if (tweetListData.data.success) {
            commit('GET_TWEET_LIST_DATA', tweetListData.data.data)
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
    // 消息列表数据
    GET_NOTICE_LIST_DATA: async({ commit }) => {
        try {
            const noticeListData = await axios.post('/api/notice/markedall');
            console.log(noticeListData)
            if (noticeListData.data.success) {
               commit('NOTICE_LIST_DATA', noticeListData)
            }
            // return noticeListData.data
        } catch (err) {
            console.log(err)
        }
    },
    // 消息数据
    GET_NOTICE_DATA: async({ commit }, { page, limit }) => {
        try {
            const noticeData = await axios.post('/api/notice', { page: page, limit: limit });
            if (noticeData.data.success) {
               commit('NOTICE_DATA', noticeData.data.data)
            }
            // return noticeListData.data
        } catch (err) {
            console.log(err)
        }
    },
    // 未读消息数量
    GET_NOTICE_COUNT: async({ commit }) => {
        try {
            const countData = await axios.post('/api/notice/count');
            if (countData.data.success) {
               commit('NOTICE_COUNT', countData.data.data)
            }
            // return noticeListData.data
        } catch (err) {
            console.log(err)
        }
    },
    // 举报成功
    GET_CPS_DATA: async({ commit }) => {
        try {
            const cpsData = await axios.post('/api/cps');
            if (cpsData.data.success) {
               commit('CPS_DATA', cpsData.data)
            }
            // return noticeListData.data
        } catch (err) {
            console.log(err)
        }
    },
    // 被举报
    GET_CPSED_DATA: async({ commit }) => {
        try {
            const cpsedData = await axios.post('/api/cpsed');
            if (cpsedData.data.success) {
               commit('CPSED_DATA', cpsedData.data)
            }
            // return noticeListData.data
        } catch (err) {
            console.log(err)
        }
    },
    // 恶意举报
    GET_CPS_NO_DATA: async({ commit }) => {
        try {
            const cpsnoData = await axios.post('/api/cpsno');
            if (cpsnoData.data.success) {
               commit('CPS_NO_DATA', cpsnoData.data.data)
            }
            // return noticeListData.data
        } catch (err) {
            console.log(err)
        }
    },
    // 用户是否关注了否个用户
    GET_IS_FOLLOW_DATA: async({ commit }, targetUserId) => {
        try {
            const isFollowData = await axios.post('/api/user/action/isfollow', targetUserId);
            if (isFollowData.data.success) {
               commit('IS_FOLLOW_STATE', isFollowData.data.data)
            }
            // return noticeListData.data
        } catch (err) {
            console.log(err)
        }
    },
    // 用户关注的博文列表数据
    USER_FOLLOW_TWEET_LIST_ALL_DATA: async({ commit }, { page, limit }) => {
        try {
            const userFollowData = await axios.post('/api/user/follow/tweet', { page: page, limit: limit });
            if (userFollowData.data.success) {
               commit('USER_FOLLOW_TWEET_LIST_DATA', userFollowData.data.data)
            }
            // return noticeListData.data
        } catch (err) {
            console.log(err)
        }
    },
    // 获取分类
    CATEGORY_ALL_DATA: async({ commit }, { page, limit }) => {
        try {
            const categoryData = await axios.get(`/api/categoryList?page=${page}&&limit=${limit}`);
            if (categoryData.data.success) {
               commit('CATEGORY_DATA', categoryData.data.data)
            }
            // return noticeListData.data
        } catch (err) {
            console.log(err)
        }
    },
    // 获取分类列表数据
    GET_CATEGORY_ALL_DATA: async({ commit }, { page, limit, categoryId }) => {
        try {
            const categorylistData = await axios.post('/api/falls', { page: page, limit: limit, categoryId: categoryId });
            if (categorylistData.data.success) {
               commit('CATEGORY_LIST_DATA', categorylistData.data.data)
            }
            // return noticeListData.data
        } catch (err) {
            console.log(err)
        }
    },
}