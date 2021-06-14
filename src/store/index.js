/* eslint-disable */
"use strict"
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: '',
    nickname: '',
    userId: '',
    isLogin: false,
  },
  mutations: {
    mutationLogin: (state, payload) => {
      state.nickname = payload.nickname
      state.isLogin = payload.isLogin
      state.token = payload.token
      state.userId = payload.userId
    },
    mutationLogout: (state, payload) => {
      state.nickname = ''
      state.isLogin = false
      state.token = ''
      state.userId = ''
    }
  },
  actions: {},
  modules: {}
});
