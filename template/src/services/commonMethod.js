export class Common {
  /**
   * 取得陣列索引值
   * @param {number} index 索引值
   * @param {number} currentPage 當前頁面
   * @param {number} pageSize 頁面資料數
   */
  configIndex(index, currentPage, pageSize) {
    return index + 1 + (currentPage - 1) * pageSize
  }
}