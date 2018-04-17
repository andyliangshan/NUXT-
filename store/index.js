/* eslint-disable */
import Vuex from 'vuex'
import Vue from 'vue'
import createLogger from 'vuex/dist/logger'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);

const store = () => new Vuex.Store({
    state: {
        counter: 0,
        userInfo: null,
        tweetInfoData: null,
        userAessetsInfo: null,
        userBilldata: [],
        fansData: [],
        attentedData: [],
    },
    mutations,
    actions,
    getters,
    strict: process.env.NODE_ENV === 'development',
    plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : []
})

export default store