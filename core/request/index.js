/*
 * @Author: Yang Kang
 * @Date: 2021-05-17 11:46:53
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-17 16:34:57
 */
import axios from 'axios'

const _createRequest = (host, request) => {
  const clientRequest = request.create({
    baseURL: host,
    timeout: 30000,
    headers: { 'Content-Type': 'text/plain' },
  })
  return clientRequest
}

const apiRoot = 'http://localhost:9003/api'
export const createHttpRequest = () => {
  return _createRequest(apiRoot, axios)
}

export const createDefaultRequest = (apiName, ...params) => {
  return createHttpRequest().post(apiName, ...params)
}
