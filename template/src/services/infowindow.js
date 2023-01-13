import { CustomToastr } from '@/plugins/toastr'
import { MessageBox } from 'element-ui'

const toastr = CustomToastr

/* #region 頁面提醒函數 */

/**
 * 警告視窗
 * @param {String} message 訊息
 * @param {Function} callback 回呼函數
 */
const alert = (message, callback = action => {}) => {
  MessageBox.alert(message, '', {
    confirmButtonText: '確定',
    iconClass: 'el-icon-error',
    callback: callback,
  })
}


/**
 * 確認視窗
 * @param {String} message 訊息
 * @param {String} confirmText confirm button顯示文字
 * @param {String} cancelText cancel button顯示文字
 */
const confirm = (message, confirmText='確定', cancelText='取消') => {
  return MessageBox.confirm(message, '', {
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    iconClass: 'el-icon-info'
  })
}

/**
 * 輸入視窗
 * @param {String} message 訊息
 * @returns 
 */
const prompt = message => {
  return MessageBox.prompt(message, '', {
    confirmButtonText: '確定',
    showCancelButton: false
  })
}

/**
 * 提醒訊息(成功)
 * @param {String} message 訊息
 */
const success = message => {
  toastr({ text: message,  type: 'success' })
}

/**
 * 提醒訊息(失敗)
 * @param {String} message 訊息
 */
const error = message => {
  toastr({ text: message,  type: 'danger' })
}

/**
 * 提醒訊息(一般)
 * @param {String} message 訊息
 */
const info = message => {
  toastr({ text: message,  type: 'info' })
}

/**
 * 提醒訊息(警告)
 * @param {String} message 訊息
 */
const warning = message => {
  toastr({ text: message,  type: 'wraning' })
}

export const infowindow = { alert, confirm, prompt, success, error, info, warning }

/* #endregion */

/* #region Axios 錯誤處理 */

/**
 * http失敗處理
 * @param {String} message 
 */
export const httpError = message => {
  toastr({ text: message,  type: 'danger' })
}

/* #endregion */
