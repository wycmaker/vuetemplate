export class Info {

  /**
   * 警告視窗
   * @param {Object} target 目標
   * @param {String} message 訊息
   */
  alert(target, message) {
    target.$alert(message, '', {
      confirmButtonText: '確定',
      // confirmButtonClass: 'feature-button',
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
    target.$toast({
      text: message,
      type: 'success',
      duration: 1000
    });
  }

  /**
   * 提醒訊息(失敗)
   * @param {Object} target 目標
   * @param {String} message 訊息
   */
  error(target, message) {
    target.$toast({
      text: message,
      type: 'danger',
      duration: 1000
    });
  }

  /**
   * 提醒訊息(一般)
   * @param {Object} target 目標
   * @param {String} message 訊息
   */
  info(target, message) {
    target.$toast({
      text: message,
      type: 'info',
      duration: 1000
    });
  }

  /**
   * 提醒訊息(警告)
   * @param {Object} target 目標
   * @param {String} message 訊息
   */
  warning(target, message) {
    target.$toast({
      text: message,
      type: 'wraning',
      duration: 1000
    });
  }
}