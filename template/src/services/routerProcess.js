import store from '../store'
import router from '../router'
import Cookies from 'js-cookie'
import { manager } from '@/services/userDataManager'

/* #region 頁面路由處理 */

export const routerProcess = () => {
  // 分頁處理
  pageProcess()

  // 設定使用者資訊
  setStore()

  // localhostStorage 的監聽事件
  storageChange()

  // 路由跳轉處理
  pathProcess()
}

/**
 * 分頁處理
 */
const pageProcess = () => {
  // 判斷是否有其他分頁存在
  const alreadyExist = sessionStorage.getItem('alreadyExist')
  const count = parseInt(Cookies.get('pages'))

  if ((count < 1 || isNaN(count)) && !alreadyExist) manager.clearData()

  // 重新整理後，如alreadyExist不存在 => 設定alreadyExist的值
  if (!alreadyExist) sessionStorage.setItem('alreadyExist', '1')

  // 設定當前分頁數目
  let setCount = isNaN(count) ? 1 : count + 1
  Cookies.set('pages', setCount, {
    sameSite: 'lax'
  })

  // 關閉分頁處理
  window.onunload = () => {
    let count = Cookies.get('pages')
    Cookies.set('pages', parseInt(count) - 1, {
      sameSite: 'lax'
    })
  }
}

/**
 * 設定使用者資訊
 */
const setStore = () => {
  const data = manager.getUserData()

  /**
   * 取得使用者資訊
   * 1. 可以取得 => 判斷token是否過期作相對應的動作
   * 2. 無法取得 => 清空localstorage，並將使用者導向登入頁
   */
  if (data) {
    /**
     * 可以取得使用者資訊
     * 1. token未過期 => 將使用者資訊記錄到Vuex中
     * 2. token過期 => 清空localstorage，並將使用者導向登入頁
     */
    const expiryDate = new Date(data.expiryDate)
    const now = new Date()
    if (now < expiryDate && data.token) {
      store.commit('setUserInfo', data)
      store.commit('authenticate')
    }
    else clearUserData()
  } else clearUserData()
}

/**
 * 清空使用者資訊，並導向登入頁
 */
const clearUserData = () => {
  router.push('/login')
  manager.clearData()
}

/**
 * localStorage變更事件
 */
const storageChange = () => {
  window.addEventListener("storage", (e) => {
    setStore()
  })
}

/**
 * 實際路由跳轉規則
 */
const pathProcess = () => {
  router.beforeEach((to, from, next) => {
    // 取得使用者資訊
    const data = manager.getUserData()

    // 取得欲前往的頁面
    const path = to.path.toUpperCase()

    /**
     * 1. 已登入，前往登入頁面 => 自動導向首頁
     * 2. 已登入，不是前往登入頁 => 前往目標頁面
     * 3. 未登入，前往登入頁面 => 前往目標頁面(登入頁)
     * 4. 未登入，不是前往登入頁 => 自動導向登入頁
     */
    if (data && path === '/LOGIN') next({ path: '/' })
    else if (data && path !== '/LOGIN') next()
    else if (!data && path === '/LOGIN') next()
    else next({ path: '/login' })
  })
}

/* #endregion */

/* #region 依權限設定路由 */

export const setRoute = (authorityLList) => {
  // 依權限塞入路由
}

/* #endregion */
