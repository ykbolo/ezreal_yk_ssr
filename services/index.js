/*
 * @Author: Yang Kang
 * @Date: 2021-05-17 11:52:17
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-17 16:06:56
 */
import { createDefaultRequest } from '../core/request'

const getPicsFromServer = (params) => {
  return createDefaultRequest('/getPicsFromServer', params)
}
export default {
  getPicsFromServer,
}
