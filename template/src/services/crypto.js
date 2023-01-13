const CryptoJS = require("crypto-js")

const key = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse('QEDF$%@_($KLS'))
const iv = CryptoJS.MD5(CryptoJS.enc.Utf8.parse('Q#%@KD*5)7'))

/**
 * 加密
 * @param {String} data 來源
 * @returns {String} 加密後的字串
 */
export const encrypt = (data) => {
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
  
  
/**
 * 解密
 * @param {String} encrypted 加密字串
 * @returns {String} 解密後的字串
 */
export const decrypt = (encrypted) => {
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

/**
 * 加密(HEX)
 * @param {String} data 來源
 * @returns {String} 加密後的字串
 */
export const encryptHex = data => {
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString()
}

/**
 * 解密(HEX)
 * @param {String} data 來源
 * @returns {String} 解密後的字串
 */
export const decryptHex = data => {
  const encryptText = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(data))
  const decrypted = CryptoJS.AES.decrypt(encryptText, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}