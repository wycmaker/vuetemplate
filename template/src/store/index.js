import Vue from 'vue'
import Vuex from 'vuex'
import { manager  } from '@/services/userDataManager'
import { router } from '../router'
const url = process.env.FOLDER_PATH

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    token: null,
    expiryDate: null,
    isAuthenticated: false,
    clientWidth: null
  },
  getters: {
    token: state => {
      return state.token
    },
    isAuthenticated: state => {
      if (!state.token) {
        return false
      }
      return state.isAuthenticated
    },
    currentUser: state => {
      if(state.userInfo !== null) return state.userInfo.userInfoID
      else return ''
    },
  },
  mutations: {
    /**
     * 設定使用者資訊
     * @param {object} state Vuex state物件
     * @param {object} info 使用者資訊
     */
    setUserInfo(state, info) {
      state.userInfo = Object.assign({}, info)
      state.token = info.token
      state.expiryDate = info.expiryDate
      manager.setUserData(info)
    },
    /**
     * 將狀態設為已授權
     * @param {object} state Vuex state物件
     */
    authenticate(state) {
      state.isAuthenticated = true
    },
    /**
     * 清空state資料
     * @param {object} state Vuex state物件
     * @param {string} path 跳轉路徑
     */
    clearUserInfo(state, path) {
      state.token = null
      state.expiryDate = null
      state.isAuthenticated = false
      state.userInfo = null
      manager.clearData()
      router.push(`${url}${path}`)
    },
    /**
     * 設定當前的clientWidth
     * @param {object} state Vuex state物件
     * @param {number} width 當前的Client Width
     */
    setClientWidth(state, width) {
      state.clientWidth = width
    }
  },
  // 嚴格模式，禁止直接修改 state
  strict: true
})