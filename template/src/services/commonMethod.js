/* #region Export Function  */


/**
 * 依選項做排序
 * @param {Array} data 選擇的數值列表
 * @param {Array} options 所有選項列表
 * @returns 
 */
const sortValue = (data, options) => {
  // 依欄位數值排序
  let arr = []
  data.forEach(item => {
    let index = options.findIndex(r => r.label === item)
    arr.push(index)
  })
  arr = arr.sortBySeq('AES')
  let result = []
  arr.forEach(item => {
    if(item !== -1) result.push(options[item].label)
  })
  return result
}

export const common = { 
  sortValue: sortValue
}

/* #endregion */

/* #region Javascript Prototype */

/* ========== String ========== */
String.prototype.getPath = function () {
  return this.substring(2, this.length)
}

/* =========== Date =========== */
Date.prototype.addYear = function (years) {
  this.setFullYear(this.getFullYear() + years)
  return this
}

Date.prototype.addMonth = function (months) {
  this.setMonth(this.getMonth() + months)
  return this
}

Date.prototype.addDay = function (days) {
  this.setDate(this.getDate() + days)
  return this
}

Date.prototype.toString = function (delimiters) {
  let year = this.getFullYear()
  let month = this.getMonth() + 1
  let day = this.getDate()
  return year + delimiters + month.toString().padStart(2, '0') + delimiters + day.toString().padStart(2, '0')
}

Array.prototype.Sum = function() {
  return this.reduce((a, b) => { return a + b })
}

Array.prototype.sortByKey = function(key) {
  return this.sort((a, b) => { return a[key] > b[key] ? 1 : -1 })
}

Array.prototype.sortBySeq = function(seq) {
  if(seq === "AES") return this.sort((a, b) => { return a > b ? 1 : -1 })
  else return this.sort((a, b) => { return a < b ? 1 : -1 })
}

/* #endregion */
