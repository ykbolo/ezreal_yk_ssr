/*
 * @Author: Yang Kang
 * @Date: 2021-05-17 11:52:17
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-24 14:23:23
 */
import { createDefaultRequest } from '../core/request'

const getPicsFromServer = params => {
  return createDefaultRequest('/getPicsFromServer', params)
}
const getArticleByMd5 = params => {
  return createDefaultRequest('/getArticleByMd5', params)
}
export default {
  getPicsFromServer,
  getArticleByMd5
}
