import { toastr } from '@/services/toastr'
import { MessageBox } from 'element-ui'

let options = {
  "closeButton": false, // 顯示關閉按鈕
  "debug": false, // 除錯
  "newestOnTop": false, // 最新一筆顯示在最上面
  "progressBar": true, // 顯示隱藏時間進度條
  "positionClass": "toast-bottom-center", // 位置的類別
  "preventDuplicates": false, // 隱藏重覆訊息
  "onclick": null, // 當點選提示訊息時，則執行此函式
  "timeOut": "1000", // 當超過此設定時間時，則隱藏提示訊息(單位: 毫秒)
  "extendedTimeOut": "1000",
}

/* #region 頁面提醒函數 */

/**
 * 警告視窗
 * @param {String} message 訊息
 */
const alert = message => {
  MessageBox.alert(message, '', {
    confirmButtonText: '確定',
    iconClass: 'el-icon-error',
    callback: action => {},
  })
}


/**
 * 確認視窗
 * @param {String} message 訊息
 */
const confirm = message => {
  return MessageBox.confirm(message, '', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    iconClass: 'el-icon-info'
  })
}

/**
 * 提醒訊息(成功)
 * @param {String} message 訊息
 */
const success = message => {
  toastr.success(message, '', options)
}

/**
 * 提醒訊息(失敗)
 * @param {String} message 訊息
 */
const error = message => {
  toastr.error(message, '', options)
}

/**
 * 提醒訊息(一般)
 * @param {String} message 訊息
 */
const info = message => {
  toastr.info(message, '', options)
}

/**
 * 提醒訊息(警告)
 * @param {String} message 訊息
 */
const warning = message => {
  toastr.warning(message, '', options)
}

export const infowindow = { alert, confirm, success, error, info, warning }

/* #endregion */

/* #region Axios 錯誤處理 */

/**
 * http失敗處理
 * @param {String} message 
 */
export const httpError = message => {
  toastr.error(message, '', options)
}

/* #endregion */
