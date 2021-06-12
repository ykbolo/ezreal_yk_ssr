/*
 * @Author: Yang Kang
 * @Date: 2021-05-17 11:52:17
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-06-03 18:15:04
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
const searchMds = params => {
    return createDefaultRequest('/searchMds', params)
}
const getPicJson = params => {
    return createDefaultRequest('/getPicJson', params)
}
export default {
    getPicsFromServer,
    getArticleByMd5,
    getMdFromMysql,
    addOneSubmit,
    getSubmitsFromMysql,
    searchMds,
    getPicJson
}