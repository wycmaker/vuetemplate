import { encrypt, decrypt } from '@/services/crypto'

const name = 'user.template'
/* #region export function */

/**
 * 將加密後的使用者資訊存至localstorage
 * @param {Object} data 
 */
const setUserData = (data) => {
  const ciphertext = encrypt(JSON.stringify(data))
  if (localStorage.getItem(name) !== ciphertext) localStorage.setItem(name, ciphertext)
}

/**
 * 取得使用者資料
 * @returns {Object} 使用者資訊
 */
const getUserData = () => {
  const ciphertext = localStorage.getItem(name)

  if (ciphertext) {
    try {
      const decryptedStr = decrypt(ciphertext)
      const data = JSON.parse(decryptedStr)
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
  localStorage.removeItem('user.template')
}

export const manager = {
  setUserData: setUserData,
  getUserData: getUserData,
  clearData: clearData
}

/* #endregion */
