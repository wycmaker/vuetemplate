const CryptoJS = require("crypto-js")

const name = 'user.template'
const key = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse('QEDF$%@_($KLS'))
const iv = CryptoJS.MD5(CryptoJS.enc.Utf8.parse('Q#%@KD*5)7'))

/* #region export function */

/**
 * 將加密後的使用者資訊存至localstorage
 * @param {Object} data 
 */
const setUserData = (data) => {
  const ciphertext = encrypt(JSON.stringify(data));
  if (localStorage.getItem(name) !== ciphertext) localStorage.setItem(name, ciphertext)
}

/**
 * 取得使用者資料
 * @returns {Object} 使用者資訊
 */
const getUserData = () => {
  const ciphertext = localStorage.getItem(name);

  if (ciphertext) {
    try {
      const decryptedStr = decrypt(ciphertext);
      const data = JSON.parse(decryptedStr);
      return data
    } catch (error) {
      return null
    }
  }

  return null
}

/**
 * 從localstorage清除使用者資訊
 */
const clearData = () => {
  localStorage.clear()
}

export const manager = {
  setUserData: setUserData,
  getUserData: getUserData,
  clearData: clearData
}

/* #endregion */


/* #region 私有函數 */

/**
 * 加密
 * @param {String} data 來源
 * @returns {String} 加密後的字串
 */
const encrypt = (data) => {
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}


/**
 * 解密
 * @param {String} encrypted 加密字串
 * @returns {String} 揭密後的字串
 */
const decrypt = (encrypted) => {
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

/* #endregion */
