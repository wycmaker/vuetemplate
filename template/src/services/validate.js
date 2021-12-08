let pattern = {
    // notChinese: /[^\u4e00-\u9fa5]?/,
    notChinese: /^[^\u4e00-\u9fa5]*$/,
    // "[\u4E00-\u9FA5]+"
    cellphone: /(^[0-9]{0}$|^[0-9]{10})$/,
    email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    intOnly: /^[0-9]+$|^[0-9]+\.[0-9]+$/,
    numberOnly: /^[0-9]+$/
  }
  
  export class Validate {
    /* 密碼驗證函數 */
    passwordValidator(rule, value, callback, isRequired) {
      if(isRequired) {
        if(value !== null && value !== undefined && value.trim() !== '') callback();
        else callback("密碼不可為空")
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
  }