/**
 * @name 存储
 * @description 可以存储字符串和对象
 */

/**
 * @name 基本存储
 */
class StorageBase {
  /**
   * @name 构造方法
   * @param {Object} storage 存储方法
   */
  constructor(storage) {
    this.storage = storage
  }

  /**
   * @name 保存
   * @param {String} key 键名
   * @param {Any} value 键值
   */
  set(key, value) {
    this.storage.setItem(key, value)
  }

  /**
   * @name 读取
   * @param {String} key 键名
   */
  get(key) {
    return this.storage.getItem(key)
  }

  /**
   * @name 保存对象
   * @param {String} key 键名
   * @param {Any} value 键值
   */
  setObject(key, object) {
    this.storage.setItem(key, JSON.stringify(object))
  }

  /**
   * @name 读取对象
   * @param {String} key 键名
   */
  getObject(key) {
    return JSON.parse(this.storage.getItem(key))
  }

  /**
   * @name 删除
   * @param {String} key 键名
   */
  remove(key) {
    this.storage.removeItem(key)
  }

  /**
   * @name 判断是否包含
   * @param {String} key 键名
   */
  contains(key) {
    return this.get(key) !== null
  }

  /**
   * @name 清空
   */
  clear() {
    this.storage.clear()
  }
}

/**
 * @name 本地存储
 */
class LocalStorage extends StorageBase {
  /**
   * @name 构造方法
   */
  constructor() {
    super(window.localStorage)
  }
}
/**
 * @name 会话存储
 */
class SessionStorage extends StorageBase {
  /**
   * @name 构造方法
   */
  constructor() {
    super(window.sessionStorage)
  }
}

export default { LocalStorage, SessionStorage }
