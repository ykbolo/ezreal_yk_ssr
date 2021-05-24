/*
 * @Author: Yang Kang
 * @Date: 2021-05-17 11:46:53
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-24 16:17:24
 */
import axios from 'axios'
import queryString from '../query-string'

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

const apiRoot = 'http://localhost:9003/api'
export const createHttpRequest = () => {
  return _createRequest(apiRoot, axios)
}

export const createDefaultRequest = (apiName, params) => {
  return createHttpRequest().post(apiName, params)
}
