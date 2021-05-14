/**
 * @name URL参数解析
 */

import qs from 'qs'

const options = {
  allowPrototypes: true,
  encodeValuesOnly: true,
  sort: (a, b) => a.localeCompare(b), // parameter display sequence by A-Z
  allowDots: true,
  arrayFormat: 'brackets'
}

/**
 * @name 解析
 * @param {String} value 字符串
 * @return {Object} 对象
 */
const parse = value => {
  return qs.parse(value, options)
}
/**
 * @name 序列化
 * @param {Object} value 对象
 * @return {String} 字符串
 */
const stringify = value => {
  return qs.stringify(value, options)
}

export default {
  parse,
  stringify
}
