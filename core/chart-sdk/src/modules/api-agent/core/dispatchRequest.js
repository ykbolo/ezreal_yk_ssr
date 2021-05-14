/*
 * @Author: zhihao_su
 * @Date: 2020-12-23 11:36:33
 * @LastEditors: zhihao_su
 * @LastEditTime: 2021-04-02 19:14:58
 */
import jsBridge from '../../qxb-bridge'
import { buildURL, parseURL } from './utils'

export default function dispatchRequest(config) {
  return new Promise((resolve, reject) => {
    let method = config.method.toUpperCase()
    let body = config.data
    // axios会将对象序列化
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body)
      } catch {}
    }
    let timeout = config.timeout || 10 * 1000 // 10s
    // 合并fullPath和config中的query
    let fullUrl = buildURL(config.url, config.params, config.paramsSerializer)
    let { path, query } = parseURL(fullUrl, config.baseURL)
    // 设置超时定时器
    let timer = setTimeout(() => {
      timer = null
      reject(new Error(`timeout of ${timeout}ms exceeded`))
    }, timeout)
    // 发起请求
    jsBridge
      .call('QXB.Common.Api.Agent', {
        method,
        path,
        query,
        body
      })
      .then(data => {
        if (timer) {
          clearTimeout(timer)
          timer = null
          if (typeof data === 'string') {
            try {
              data = JSON.parse(data)
            } catch {}
          }
          if (+data.agent_status === 0) {
            let error = new Error('Network Error')
            error.response = {
              status: 500,
              data: {
                status: data.agent_status,
                message: data.agent_message
              }
            }
            reject(error)
          } else {
            resolve(data)
          }
        }
      })
  })
    .then(data => {
      return Promise.resolve({
        config,
        data,
        status: 200,
        statusText: 'OK'
      })
    })
    .catch(err => {
      err.config = config
      return Promise.reject(err)
    })
}
