/**
 * @name 缓存
 * @description 可保存在内存、sessionStorage、localStorage，可配置ttl
 */

import storage from '../../common/storage'

const Prefix = 'WEBC-SDK-CACHE'

/**
 * @name 内存
 */
class Memory {
  /**
   * @name 构造方法
   */
  constructor() {
    this.storage = {}
  }

  /**
   * @name 保存对象
   * @param {String} key 键名
   * @param {Any} value 键值
   */
  setObject(key, object) {
    this.storage[key] = object
  }

  /**
   * @name 读取对象
   * @param {String} key 键名
   */
  getObject(key) {
    return this.storage[key]
  }

  /**
   * @name 删除
   * @param {String} key 键名
   */
  remove(key) {
    delete this.storage[key]
  }

  /**
   * @name 判断是否包含
   * @param {String} key 键名
   */
  contains(key) {
    return key in this.storage
  }
}

/**
 * @name 条目
 */
class Item {
  /**
   * @name 构造方法
   * @param {String} key 键名
   * @param {Any} value 键值
   * @param {Number} ttl 生存时间。单位：s
   */
  constructor(key, value, ttl) {
    this.key = key
    this.value = value
    this.ttl = ttl * 1000
    this.time = Date.now()
  }
}

/**
 * @name 缓存
 */
class Cache {
  /**
   * @name 构造方法
   * @param {String} name 缓存名
   * @param {String} type 类型。memory，local，session
   * @param {Number} ttl 生存时间。单位：s
   */
  constructor(name, type = 'memory', ttl = 60 * 60 * 24) {
    this.name = name
    this.ttl = ttl

    if (type === 'memory') {
      this.storage = new Memory()
    } else if (type === 'local') {
      this.storage = new storage.LocalStorage()
    } else if (type === 'session') {
      this.storage = new storage.SessionStorage()
    }
  }

  /**
   * @name 设置
   * @param {String} key 键名
   * @param {Any} value 键值
   * @param {Number} ttl 生存时间。单位：s
   */
  set(key, value, ttl = undefined) {
    let item = new Item(key, value, ttl || this.ttl)

    this.storage.setObject(`${Prefix}_${this.name}_${key}`, item)
  }

  /**
   * @name 获取
   * @param {String} key 键名
   * @return {Any} 键值
   */
  get(key) {
    let item = this.storage.getObject(`${Prefix}_${this.name}_${key}`)

    if (item && Date.now() < item.time + item.ttl) {
      return item.value
    } else {
      return null
    }
  }

  /**
   * @name 清除
   * @param {String} key 键名
   */
  remove(key) {
    this.storage.remove(key)
  }
}

export default Cache
