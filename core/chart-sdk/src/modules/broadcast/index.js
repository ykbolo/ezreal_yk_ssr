/**
 * @name 广播
 */

/**
 * @name 广播
 */
class Broadcast {
  /**
   * @name 构造方法
   */
  constructor() {
    this.events = {}
  }

  /**
   * @name 开始监听
   * @param {String} name 事件名
   * @param {Function} callback 回调函数
   */
  on(name, callback) {
    if (typeof callback !== 'function') {
      throw new Error('callback must be a function')
    }

    if (!this.events[name]) {
      this.events[name] = []
    }

    this.events[name].push(callback)
  }

  /**
   * @name 停止监听
   * @param {String} name 事件名
   * @param {Function} callback 回调函数
   */
  off(name, callback) {
    let list = this.events[name]

    if (list) {
      let index = list.indexOf(callback)
      if (index > -1) {
        list.splice(index, 1)
      }
    }
  }

  /**
   * @name 触发
   * @param {String} name 事件名
   */
  emit(name, data) {
    let list = this.events[name]

    if (list) {
      setTimeout(() => { // 异步触发
        for (let a of list) {
          a(data)
        }
      }, 0)
    }
  }
}

export default Broadcast
