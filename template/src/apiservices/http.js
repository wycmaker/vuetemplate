import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { httpError} from '@/services/infowindow'
import { Loading } from 'element-ui'

/* #region Loading設定 */

let loading

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

/* #region axios setting */

const instance = axios.create({
  baseURL: process.env.API_ROOT,
  timeout: 60000,
  headers: {
    Pragma: 'no-cache'
  }
})

// Request Interceptors
instance.interceptors.request.use((config) => {
  // Add Request Header
  if (!config.headers.Authorization && store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }

  startLoading()
  return config
})

// Response Interceptors
instance.interceptors.response.use(response => {
  endLoading()
  return response

}, error => {
  endLoading()
  if (error && error.response) {
    const { status, config } = error.response
    const { url } = config
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
    httpError(message)
    if (status === 401) {
      store.commit('clearUserInfo')
      router.push('/login')
    }
  } 
  else return Promise.reject(error)
})

/* #endregion */

/* #region Export Http Methods*/

const config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

export default function (method, url, data, isFormData = false) {
  switch (method) {
    case 'get':
      return instance.get(url, {
        params: data
      })
    case 'post':
      if (!isFormData) return instance.post(url, data)
      else return instance.post(url, data, config)
  }
}
/* #endregion */
