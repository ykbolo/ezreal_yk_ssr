/**
 * @name URL参数解析
 */

import queryString from '../../common/query-string/index'

/**
 * @name 解析window.location.search
 * @param {String} search URL参数
 * @return {Object} 对象
 */
const query = (search = window.location.search) => {
  return queryString.parse(search.replace('?', '')) || {}
}

export default {
  parse: queryString.parse,
  stringify: queryString.stringify,
  query
}
