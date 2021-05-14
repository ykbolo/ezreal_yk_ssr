/**
 * @name 埋点
 */

import queryString from '../../common/query-string'

/**
 * @name 埋点发送器
 */
class Tracker {
  /**
   * @name 构造方法
   * @param {String} name 应用名
   * @param {String} appid 应用代码
   * @param {Function} getIds 页面id获取函数。返回{pi, ui, di, last_page_id, moduleName}
   * @param {String} version 埋点版本
   * @param {String} from 来源
   * @param {String} target 目标。console，test，prod
   */
  constructor({ name, appid, version = '1.0.0', getIds = undefined, from = undefined, target = 'console' }) {
    this.name = name
    this.appid = appid
    this.getIds = getIds
    this.version = version
    this.from = from
    this.target = target
  }

  /**
   * @name 发送埋点请求
   * @param {Object} data 数据
   */
  send(data) {
    if (this.target === 'console') {
      console.debug('埋点事件：' + JSON.stringify(data)) // eslint-disable-line
    } else {
      let host = this.target === 'prod' ? 'https://www.qixin.com/analysis' : 'https://logio-sandbox.intsig.net/logapi/cc.gif'
      let url = `${host}?${queryString.stringify(data)}`

      let xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.send()
    }
  }

  /**
   * @name 组织数据
   * @param {Object} entity 实体数据
   * @param {Object} extra 额外数据
   * @param {Object} ids 标识。{pi, ui, di, last_page_id, moduleName}
   * @return {Object} 数据
   */
  formatData(entity = {}, extra = {}, ids = undefined) {
    if (!ids) {
      if (typeof this.getIds === 'function') {
        ids = this.getIds()
      } else {
        ids = {}
      }
    }

    let data = {
      appid: this.appid, // 用于接口验证
      t: +new Date(), // 必填
      pn: this.name, // 必填
      pv: this.version, // 必填，对应版本号version_id
      rf: this.from, // 对应from
      pi: ids.pi || '', // 必填，当前页面代号
      ui: ids.ui || '', // ui和di必填其一, 对应user_id
      di: ids.di || '' // ui和di必填其一，对应device_id
    }

    if (ids.lastPageId) {
      entity.last_page_id = ids.last_page_id
    }
    if (ids.moduleName && !entity['模块']) {
      entity['模块'] = ids.moduleName
    }

    return Object.assign(data, { d: JSON.stringify(entity).replace('{}', '') }, extra)
  }

  /**
   * @name 点击行为
   * @param {String} eventName 事件名
   * @param {Object} entity 实体数据
   * @param {Object} ids 标识。{pi, ui, di, last_page_id, moduleName}
   */
  action(eventName, entity, ids = undefined) {
    let data = this.formatData(entity, { ai: eventName }, ids)

    this.send(data)
  }

  /**
   * @name 数据展示
   * @param {String} eventName 事件名
   * @param {Object} entity 实体数据
   * @param {Object} ids 标识。{pi, ui, di, last_page_id, moduleName}
   */
  trace(eventName, entity, ids = undefined) {
    let data = this.formatData(entity, { ti: eventName }, ids)

    this.send(data)
  }

  /**
   * @name 访问页面
   * @param {Object} entity 实体数据
   * @param {Object} ids 标识。{pi, ui, di, last_page_id, moduleName}
   */
  page(entity, ids = undefined) {
    let data = this.formatData(entity, undefined, ids)

    this.send(data)
  }
}

export default Tracker
