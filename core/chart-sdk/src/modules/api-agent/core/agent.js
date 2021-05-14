/*
 * @Author: zhihao_su
 * @Date: 2020-12-23 11:35:33
 * @LastEditors: zhihao_su
 * @LastEditTime: 2021-03-19 15:47:31
 */
import qs from 'qs'
import Interceptor from './interceptor'
import dispatchRequest from './dispatchRequest'

export default class Agent {
  #timeout = 10 * 1000 // 10s
  #config = {}
  interceptors = null

  constructor(config) {
    this.interceptors = {
      request: new Interceptor(),
      response: new Interceptor()
    }

    this.#config = config
  }

  #mergeConfig(config) {
    return {
      timeout: this.#timeout,
      paramsSerializer: this.paramsSerializer,
      ...this.#config,
      // customer config
      ...config
    }
  }

  paramsSerializer(params) {
    return qs.stringify(params)
  }

  #request(config) {
    let chain = [dispatchRequest, undefined]
    let promise = Promise.resolve(config)

    // 先注册的后执行，保证配置优先级最高
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected)
    })

    // 先注册的先执行，保证处理响应的顺序一致
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      chain.push(interceptor.fulfilled, interceptor.rejected)
    })

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift())
    }

    return promise
  }

  post(url, data, config = {}) {
    return this.#request({
      method: 'POST',
      url,
      data,
      ...this.#mergeConfig(config)
    })
  }

  get(url, config = {}) {
    return this.#request({
      method: 'GET',
      url,
      ...this.#mergeConfig(config)
    })
  }
}
