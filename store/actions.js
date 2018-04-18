import axios from '~/plugins/axios'

export default {
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
    }
    // LOGIN_PHONE: async({ commit }) => {
    // }
}