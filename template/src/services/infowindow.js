let options = {
  "closeButton": false, // 顯示關閉按鈕
  "debug": false, // 除錯
  "newestOnTop": false,  // 最新一筆顯示在最上面
  "progressBar": true, // 顯示隱藏時間進度條
  "positionClass": "toast-bottom-center", // 位置的類別
  "preventDuplicates": false, // 隱藏重覆訊息
  "onclick": null, // 當點選提示訊息時，則執行此函式
  "timeOut": "1000", // 當超過此設定時間時，則隱藏提示訊息(單位: 毫秒)
  "extendedTimeOut": "1000",
}

export class Info {

  /**
   * 警告視窗
   * @param {Object} target 目標
   * @param {String} message 訊息
   */
  alert(target, message) {
    target.$alert(message, '', {
      confirmButtonText: '確定',
      iconClass: 'el-icon-error',
      callback: action => {},
    })
  }

  /**
   * 確認視窗
   * @param {Object} target 目標
   * @param {String} message 訊息
   */
  confirm(target, message) {
    return target.$confirm(message, '', {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      iconClass: 'el-icon-info'
    })
  }

  /**
   * 提醒訊息(成功)
   * @param {Object} target 目標
   * @param {String} message 訊息
   */
  success(target, message) {
    target.$toastr.success(message, '', options)
  }

  /**
   * 提醒訊息(失敗)
   * @param {Object} target 目標
   * @param {String} message 訊息
   */
  error(target, message) {
    const response = message.response
    if(response !== undefined && response.status === 403 && response.data !== undefined && response.data.message !== undefined) {
      target.$toastr.error(response.data.message, '', options)
    }
    else if(JSON.parse(JSON.stringify(message)).status !== 401) {
      target.$toastr.error(message, '', options)
    }
  }

  /**
   * 提醒訊息(一般)
   * @param {Object} target 目標
   * @param {String} message 訊息
   */
  info(target, message) {
    target.$toastr.info(message, '', options)
  }

  /**
   * 提醒訊息(警告)
   * @param {Object} target 目標
   * @param {String} message 訊息
   */
  warning(target, message) {
    target.$toastr.warning(message, '', options)
  }
}