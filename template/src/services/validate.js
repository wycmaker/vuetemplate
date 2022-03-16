let pattern = {
  notChinese: /^[^\u4e00-\u9fa5]*$/,
  cellphone: /(^[0-9]{0}$|^[0-9]{10})$/,
  email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  intOnly:  /^[0-9]*$/,
  numberOnly: /^[0-9]*$|^[0-9]+\.[0-9]+$/
}
  
export class Validate {
  /* 密碼驗證函數 */
  passwordValidator(rule, value, callback, isRequired, message) {
    if(isRequired) {
      if(value !== null && value !== undefined && value.trim() !== '') callback();
      else callback(message + "不可為空")
    } else callback();
  }

  /* 確認密碼驗證函數 */
  confirmValidator(rule, value, callback, newPassword) {
    if(value !== null && value !== undefined && value.trim() !== '' && value !== newPassword) callback('兩次密碼輸入不一致');
    else callback();
  }

  /* 驗證格式函數 */
  rexValidator(rule, value, callback) {
    const reg = pattern[this];
    const match = reg.test(value);
    if(match || value == null) callback();
    else {
      switch(this) {
        case 'notChinese': 
          callback('不可輸入中文');
        case 'cellphone':
          callback('手機號碼格式錯誤');
        case 'email':
          callback('E-mail格式錯誤');
        case 'numberOnly':
          callback('整數或小數格式輸入錯誤');
        case 'intOnly':
          callback('僅能輸入數字');
        default:
          callback('輸入格式錯誤');
      }
    }
  }

  /* 陣列驗證函數 */
  arrayValidator(rule, value, callback, message) {
    var empty = false
    value.forEach(item => {
      if(item === null || item.trim() === '') callback(`${message}不可有空值`)
    })
    if(empty === false) callback()
    else callback(`${message}不可有空值`)
  }
}