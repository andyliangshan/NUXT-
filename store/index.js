/* eslint-disable */
import Vuex from 'vuex'
import Vue from 'vue'
import createLogger from 'vuex/dist/logger'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vuex);
Vue.use(Vue2TouchEvents);

export function createStore() {
    return new Vuex.Store({
        state: { counter: 100 },
        mutations: {
           increment (state) {
             state.counter++
           }
        },
        strict: process.env.NODE_ENV === 'development',
        plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : []
    })
}