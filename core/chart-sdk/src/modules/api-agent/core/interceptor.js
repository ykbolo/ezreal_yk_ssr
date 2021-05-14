/*
 * @Author: zhihao_su
 * @Date: 2020-12-23 11:34:52
 * @LastEditors: zhihao_su
 * @LastEditTime: 2021-03-16 11:25:23
 */
import _forEach from 'lodash-es/forEach'
export default class Interceptor {
  handlers = []

  constructor() {
    this.handlers = []
  }

  use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected
    })
    return this.handlers.length - 1
  }

  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null
    }
  }

  forEach(fn) {
    _forEach(this.handlers, h => {
      if (h !== null) {
        fn(h)
      }
    })
  }
}
