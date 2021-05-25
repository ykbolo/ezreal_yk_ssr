/*
 * @Author: Yang Kang
 * @Date: 2021-05-17 11:52:17
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-25 16:55:08
 */
import { createDefaultRequest } from '../core/request'

const getPicsFromServer = params => {
  return createDefaultRequest('/getPicsFromServer', params)
}
const getArticleByMd5 = params => {
  return createDefaultRequest('/getArticleByMd5', params)
}
const getMdFromMysql = params => {
  return createDefaultRequest('/getMdFromMysql', params)
}
const addOneSubmit = params => {
  return createDefaultRequest('/submitToday', params)
}
const getSubmitsFromMysql = params => {
  return createDefaultRequest('/getSubmitsFromMysql', params)
}
export default {
  getPicsFromServer,
  getArticleByMd5,
  getMdFromMysql,
  addOneSubmit,
  getSubmitsFromMysql
}
