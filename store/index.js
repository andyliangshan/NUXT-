/* eslint-disable */
import Vuex from 'vuex'
import Vue from 'vue'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

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