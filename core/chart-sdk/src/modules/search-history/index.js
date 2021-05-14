/**
 * @name 搜索历史
 */

import storage from '../../common/storage/index'

const localStorage = new storage.LocalStorage()

/**
 * @name 搜索历史
 */
class SearchHistory {
  /* construct */

  /**
   * @name 构造方法
   * @param {String} name 存储名
   * @param {Number} max 最大长度
   */
  constructor(name, max = 10) {
    this.name = name
    this.max = max

    this.list = localStorage.getObject(name) || []
  }

  /* public */

  /**
   * @name 添加
   * @param {Any} value 值
   */
  add(value) {
    if (this.list.includes(value)) {
      this.remove(value)
    }
    this.list.unshift(value)
    if (this.list.length > this.max) {
      this.list.splice(this.max)
    }

    localStorage.setObject(this.name, this.list)
  }

  /**
   * @name 删除
   * @param {Any} value 值
   */
  remove(value) {
    this.list.splice(this.list.indexOf(value), 1)

    localStorage.setObject(this.name, this.list)
  }

  /**
   * @name 清空
   */
  clear() {
    this.list.splice(0)

    localStorage.setObject(this.name, this.list)
  }
}

export default SearchHistory
