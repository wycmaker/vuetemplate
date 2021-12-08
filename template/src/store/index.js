import Vue from 'vue';
import Vuex from 'vuex';
import { UserManager } from '@/services/userDataManager';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null,
    token: null,
    expiryDate: null,
    isAuthenticated: false,
  },
  getters: {
    token: state => {
      return state.token;
    },
    isAuthenticated: state => {
      if (!state.token) {
        return false;
      }
      return state.isAuthenticated;
    },
  },
  mutations: {
    setUserInfo(state, info) {
      state.userInfo = Object.assign({}, info);
      state.token = info.token;
      state.expiryDate = info.expiryDate;
      
      const manager = new UserManager();
      manager.setUserData(info);
    },
    authenticate(state) {
      state.isAuthenticated = true;
    },
    clearUserInfo (state) {
      state.token = null;
      state.expiryDate = null;
      state.isAuthenticated = false;
      state.userInfo = null;

      const manager = new UserManager();
      manager.clearData();
    },
  },
  // 嚴格模式，禁止直接修改 state
  strict: true
});