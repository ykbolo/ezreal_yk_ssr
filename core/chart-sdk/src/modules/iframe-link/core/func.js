/**
 * @name 函数
 */

/**
 * @name 是否在iframe中
 * @return {Boolean} 结果
 */
function isIn() {
  return window.top !== window
}
/**
 * @name 发送消息
 * @param {Function} target 包装过的目标窗口postMessage。比如：(data,origin)=>{window.top.postMessage(data,origin)}
 * @param {String} origin 目标源
 * @param {String} name 连接名称
 * @param {String} type 类型
 * @param {Any} payload 数据
 * @param {Object} options 选项。response：要求响应
 */
function sendMessage(target, origin, name, type, payload, { response = false } = {}) {
  target({ name, type, payload, response }, origin)
}
/**
 * @name 发送消息直到收到响应
 * @description 响应格式：{type: 'RESPONSE', message}。message为来源消息的type
 * @param {Function} target 目标窗口postMessage
 * @param {String} origin 目标源
 * @param {String} name 连接名称
 * @param {String} type 类型
 * @param {Any} payload 数据
 */
function sendMessageUntilResponse(target, origin, name, type, payload) {
  let timer

  let receive = ev => {
    if (/RESPONSE/.test(ev.data && ev.data.type)) {
      clearInterval(timer)
      window.removeEventListener('message', receive)
    }
  }

  window.addEventListener('message', receive)
  timer = setInterval(() => {
    sendMessage(target, origin, name, type, payload, { response: true })
  }, 1000)
}

/**
 * @name 发送消息到顶层窗口
 * @param {String} origin 目标源
 * @param {String} name 连接名称
 * @param {String} type 类型
 * @param {Any} payload 数据
 */
function sendMessageToTop(origin, name, type, payload) {
  sendMessage(
    (data, origin) => {
      window.top.postMessage(data, origin)
    },
    origin,
    name,
    type,
    payload
  )
}

/**
 * @name 过滤消息
 * @param {Object} event 消息事件
 * @param {String} origin 源
 * @param {String} name 连接名称
 * @param {String} type 消息类型
 * @return {Boolean} 结果
 */
function filterMessage(event, { origin = undefined, name = undefined, type = undefined } = {}) {
  if (origin && origin !== '*' && event.origin !== origin) {
    return false
  }
  if (name && (!event.data || event.data.name !== name)) {
    return false
  }
  if (type && (!event.data || event.data.type !== type)) {
    return false
  }

  return true
}

export { isIn, sendMessage, sendMessageUntilResponse, sendMessageToTop, filterMessage }
