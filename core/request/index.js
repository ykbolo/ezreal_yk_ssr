/*
 * @Author: Yang Kang
 * @Date: 2021-05-17 11:46:53
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-26 15:45:11
 */
import axios from 'axios'
import queryString from '../query-string'
import config from '~/config/backend'
const _createRequest = (host, request) => {
  const clientRequest = request.create({
    baseURL: host,
    timeout: 30000,
    paramsSerializer: function (params) {
      console.log(params, 222)
      return queryString.stringify(params)
    },
    headers: { 'Content-Type': 'application/json' }
  })
  clientRequest.interceptors.response.use(function (response) {
    return response.data
  })
  return clientRequest
}
console.log(__DEV__, __PROD__)
const apiRoot = `${config.host}/api`
export const createHttpRequest = () => {
  return _createRequest(apiRoot, axios)
}

export const createDefaultRequest = (apiName, params) => {
  return createHttpRequest().post(apiName, params)
}
