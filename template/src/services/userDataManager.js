var aesjs = require('aes-js');
var pbkdf2 = require('pbkdf2')

var key_256 = pbkdf2.pbkdf2Sync('22ca3746-6ed3-41', 'salt', 1, 256 / 8, 'sha512');
var iv_128 = pbkdf2.pbkdf2Sync('b8-8f1f-b02aee17', 'salt', 1, 128/8, 'sha512');

export class UserManager {

  constructor() {
    this.name = "user.i"
    this.key = new Uint8Array(key_256)
    this.iv = new Uint8Array(iv_128)
    this.segmentSize = 1
  }

 /**
  * 儲存使用者資料
  * @param {Object} data 使用者資料
  */
  setUserData(data) {
    // Encrypt
    const ciphertext = this.encrypt(JSON.stringify(data), this.key, this.iv);

    if (localStorage.getItem(this.name) !== ciphertext) {
      localStorage.setItem(this.name, ciphertext);
    }
  }
  
  /**
   * 取得使用者資料
   * @returns {Object} 使用者資料
   */
  getUserData() {
    const ciphertext = localStorage.getItem(this.name);
    
    if (ciphertext) {
      try {
        const decryptedStr = this.decrypt(ciphertext, this.key, this.iv);
        const data = JSON.parse(decryptedStr);
        return data
      } catch (error) {
        return null
      }
    }
    
    return null
  }


 /**
  * 清除登入使用者資料
  */
  clearData() {
    localStorage.clear()
  }


  /**
   * 加密
   * @param {String} data 來源
   * @param {String} key key
   * @param {String} iv iv值
   * @returns {String}
   */
  encrypt(data, key, iv) { 
    var textBytes = aesjs.utils.utf8.toBytes(data);
    var aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, this.segmentSize);
    var encryptedBytes = aesCfb.encrypt(textBytes);
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
  }


  /**
   * 解密
   * @param {String} encrypted 加密字串
   * @param {Strgin} key key值
   * @param {Strgin} iv iv值
   * @returns {String}
   */
  decrypt(encrypted, key, iv) { 
    var encryptedBytes = aesjs.utils.hex.toBytes(encrypted);
    var aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, this.segmentSize);
    var decryptedBytes = aesCfb.decrypt(encryptedBytes);
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
  }
}