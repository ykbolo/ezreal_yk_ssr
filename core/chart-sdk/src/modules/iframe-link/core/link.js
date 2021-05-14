/**
 * @name 类
 */

import { sendMessage, sendMessageUntilResponse, filterMessage } from './func'

/**
 * @name 连接
 */
class Link {
  /**
   * @name 构造方法
   * @param {String} name 连接名。用于识别top和bottom之间的通信
   * @param {String} origin 源
   * @param {Function} target 目标窗口的postMessage。因为跨域获取window对象会报错，但是获取window.postMessage不会
   */
  constructor(name, origin, target) {
    this.self = window.self
    this.name = name
    this.origin = origin
    this.target = target
    this.listener = null
    this.callbacks = []

    this.listenMessage()
  }

  /* public */

  /**
   * @name 发送消息
   * @param {String} type 消息类型。自定
   * @param {Any} payload 数据
   */
  sendMessage(type, payload) {
    sendMessage(this.target, this.origin, this.name, type, payload)
  }

  /**
   * @name 发送消息直到收到响应
   * @param {String} type 类型
   * @param {Any} payload 数据
   */
  sendMessageUntilResponse(type, payload) {
    sendMessageUntilResponse(this.target, this.origin, this.name, type, payload)
  }

  /**
   * @name 监听消息
   */
  listenMessage() {
    let listener = ev => {
      if (filterMessage(ev, { origin: this.origin, name: this.name })) {
        if (ev.data && ev.data.response) {
          this.response()
        }

        for (let a of this.callbacks) {
          a(ev.data)
        }
      }
    }

    this.self.addEventListener('message', listener)
    this.listener = listener
  }

  /**
   * @name 添加监听器
   * @param {Function} callback 回调函数。传入ev.data
   */
  addListener(callback) {
    let index = this.callbacks.indexOf(callback)
    if (index === -1) {
      this.callbacks.push(callback)
    }
  }

  /**
   * @name 移除监听器
   * @param {Function} callback 回调函数
   */
  removeListener(callback) {
    let index = this.callbacks.indexOf(callback)
    if (index !== -1) {
      this.callbacks.splice(index, -1)
    }
  }

  /**
   * @name 响应
   */
  response() {
    this.sendMessage('RESPONSE')
  }

  /**
   * @name 销毁
   */
  destroy() {
    if (this.listener) {
      this.self.removeEventListener('message', this.listener)
    }
  }
}

export default Link
