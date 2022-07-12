let pattern = {
  notChinese: /^[^\u4e00-\u9fa5]*$/,
  cellphone: /(^[0-9]{0}$|^[0-9]{10})$/,
  email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  intOnly:  /^[0-9]*$/,
  numberOnly: /^[0-9]*$|^[0-9]+\.[0-9]+$/
}

/**
 * 密碼驗證函數
 * @param {Object} rule 驗證規則 
 * @param {String} value 要驗證的數值 
 * @param {Function} callback 驗證的callback function
 * @param {Boolean} isRequired 欄位是否必填
 * @param {String} message 錯誤回傳訊息 
 */
const passwordValidator = (rule, value, callback, isRequired, message) => {
  if(isRequired) {
    if(value !== null && value !== undefined && value.trim() !== '') callback()
    else callback(message + "不可為空")
  } else callback()
}

/**
 * 確認密碼驗證函數
 * @param {Object} rule 驗證規則 
 * @param {String} value 要驗證的數值 
 * @param {Function} callback 驗證的callback function
 * @param {String} newPassword 對比的數值
 */
const confirmValidator = (rule, value, callback, newPassword) => {
  if(value !== null && value !== undefined && value.trim() !== '' && value !== newPassword) callback('兩次密碼輸入不一致')
  else callback()
}

/**
 * 正規表達式驗證函數
 * @param {Object} rule 驗證規則 
 * @param {String} value 要驗證的數值 
 * @param {Function} callback 驗證的callback function
 */
const rexValidator = (rule, value, callback) => {
  const reg = pattern[this]
  const match = reg.test(value)
  if(match || value == null) callback()
  else {
    switch(this) {
      case 'notChinese': 
        callback('不可輸入中文')
      case 'cellphone':
        callback('手機號碼格式錯誤')
      case 'email':
        callback('E-mail格式錯誤')
      case 'numberOnly':
        callback('整數或小數格式輸入錯誤')
      case 'intOnly':
        callback('僅能輸入正整數')
      default:
        callback('輸入格式錯誤')
    }
  }
}

/**
 * 陣列驗證函數(內容不可為空)
 * @param {Object} rule 驗證規則 
 * @param {String} value 要驗證的數值 
 * @param {Function} callback 驗證的callback function
 * @param {String} message 錯誤回傳訊息 
 */
const arrayValidator = (rule, value, callback, message) => {
  let empty = false
  value.forEach(item => {
    if(item === null || item.trim() === '') callback(`${message}不可有空值`)
  })
  if(empty === false) callback()
  else callback(`${message}不可有空值`)
}

/**
 * 登入驗證
 * @param {String} account 帳號
 * @param {String} password 密碼
 * @returns 
 */
const loginValidator = (account, password) => {
  const isAccount = typeof(account) === 'string' && account.length > 0
  const isPassword = typeof(password) === 'string' && password.length > 0

  if(!isAccount && !isPassword) return '請輸入帳號與密碼'
  else if(!isAccount && isPassword) return '請輸入帳號'
  else if(isAccount && !isPassword) return '請輸入密碼'
  else return 'success'
}

export const validator = {
  password: passwordValidator,
  confirm: confirmValidator,
  reqularExperssion: rexValidator,
  notEmptyArray: arrayValidator,
  login: loginValidator
}