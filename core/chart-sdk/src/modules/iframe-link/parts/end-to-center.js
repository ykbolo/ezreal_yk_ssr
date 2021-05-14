/**
 * @name 端到中心的连接
 */

import Link from '../core/link'

/**
 * @name 底到顶的连接
 */
class EndToCenter extends Link {
  /* construct */

  /**
   * @name 构造方法
   * @param {String} name 连接名。用于识别top和bottom之间的通信
   * @param {String} origin 源
   * @param {Function} target 包装过的目标窗口postMessage
   */
  constructor(name, origin, target) {
    target =
      target ||
      ((data, origin) => {
        window.top.postMessage(data, origin)
      })

    super(name, origin, target)

    this.heightObserver = null
  }

  /* public */

  /**
   * @name 销毁
   */
  destroy() {
    super.destroy()

    if (this.heightObserver) {
      this.heightObserver.disconnect()
    }
  }

  /**
   * @name 实时通知自身高度变化
   * @param {Object} el 监听高度变化的DOM元素
   */
  notifyHeightChange(el) {
    const observer = new MutationObserver(() => {
      let height = el.offsetHeight
      this.sendMessage('height', height)
    })
    observer.observe(el, { attributes: true, subtree: true, childList: true, attributeFilter: ['style', 'scrollHeight', 'clientHeight', 'offsetHeight'] })
    this.heightObserver = observer

    let height = el.offsetHeight
    this.sendMessage('height', height)
  }
}

export default EndToCenter
