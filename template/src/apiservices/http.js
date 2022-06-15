import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { toast } from '@/main'
import { httpError } from '@/services/infowindow'
import { Loading } from 'element-ui'

/* #region axios setting */
const instance = axios.create({
  baseURL: process.env.API_ROOT
})

let loading

// Request Interceptors
instance.interceptors.request.use((config) => {
  // Add Request Header
  config.headers.Pragma = 'no-cache'
  if (!config.headers.Authorization && store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }

  // Add Timeout Setting
  if (!config.timeout) {
    config.timeout = 60000
  }

  startLoading()
  return config
})

// Response Interceptors
instance.interceptors.response.use(response => {
  endLoading()
  return response;

}, error => {
  endLoading()
  if (error && error.response) {
    const { status, config} = error.response
    const { url} = config
    let message = ''

    /* #region 依Http Status不同顯示不同錯誤訊息 */

    switch (status) {
      case 400:
        message = '程式發生錯誤'
        break
      case 401:
        message = '授權已過期，請重新登入'
        break
      case 403:
        message = '沒有權限進行此操作'
        break
      case 404:
        message = '請求的目標不存在'
        break
      case 405:
        message = '錯誤的Http Method'
        break
      case 500:
        message = '伺服器發生錯誤'
        break
      case 504:
        message = '伺服器無回應，請檢查Server'
        break
      default: 
        message = '程式或伺服器發生未知錯誤'
        break
    }

    /* #endregion */

    message = (status === 401 || status === 504) ? message : `${message}\nAPI：${url}`
    handleError(message)
    if(status === 401) {
      store.commit('clearUserInfo')
      router.push('/login')
    }
  } else return Promise.reject(error)
});

/**
 * 錯誤提醒處理
 * @param {String} message 
 */
const handleError = (message) => {
  httpError(toast, message)
}

/**
 * 開始loading
 */
const startLoading = () => {
  loading = Loading.service({
    lock: true,
    background: 'rgba(255, 255, 255, 0.7)',
    target: document.querySelector('#loading')
  })
}

/**
 * 結束loading
 */
const endLoading = () => {
  loading.close()
}
/* #endregion */

/* #region Export Http Methods*/
export const get = (url, data) => instance.get(url, {
  params: data
})
export const post = (url, data) => instance.post(url, data)
export const postForm = (url, data) => instance.post(url, data, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
/* #endregion */
