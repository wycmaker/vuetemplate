/* #region Export Function  */

/**
 * 取得Table Index欄位的值
 * @param {number} index 索引值
 * @param {number} currentPage 當前頁面
 * @param {number} pageSize 頁面資料數
 */
const configIndex = (index, currentPage, pageSize) => {
  return index + 1 + (currentPage - 1) * pageSize
}

export const common = { 
  configIndex: configIndex
}

/* #endregion */

/* #region Javascript Prototype */

/* ========== String ========== */
String.prototype.getPath = function () {
  return this.substring(2, this.length);
}

/* =========== Date =========== */
Date.prototype.addYear = function (years) {
  this.setFullYear(this.getFullYear() + years);
  return this;
}

Date.prototype.addMonth = function (months) {
  this.setMonth(this.getMonth() + months);
  return this;
}

Date.prototype.addDay = function (days) {
  this.setDate(this.getDate() + days);
  return this;
}

Date.prototype.toString = function (delimiters) {
  let year = this.getFullYear()
  let month = this.getMonth() + 1
  let day = this.getDate()
  return year + delimiters + month.toString().padStart(2, '0') + delimiters + day.toString().padStart(2, '0')
}

/* #endregion */
