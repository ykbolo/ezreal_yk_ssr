/**
 * @name 中心到端的连接
 */

import Link from '../core/link'

/**
 * @name 底到顶的连接
 */
class CenterToEnd extends Link {
  /* construct */

  /**
   * @name 构造方法
   * @param {String} name 连接名。用于识别top和bottom之间的通信
   * @param {String} origin 源
   * @param {Function} target 包装过的目标窗口postMessage
   */
  constructor(name, origin, target) {
    super(name, origin, target)

    this.target = target

    this.heightChangeListener = null
  }

  /* public */

  /**
   * @name 销毁
   */
  destroy() {
    super.destroy()
  }

  /**
   * @name 设置监听高度变化
   * @description 不需要监听，可以传入一个空函数
   * @param {Function} callback 回调函数。传入消息数据ev.data
   */
  setListenHeightChange(callback) {
    if (!this.heightChangeListener) {
      this.callbacks.push(data => {
        if (data && data.type === 'height' && this.heightChangeListener) {
          this.heightChangeListener(data)
        }
      })
    }

    this.heightChangeListener = callback || (() => {})
  }
}

export default CenterToEnd
