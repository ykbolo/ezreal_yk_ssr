/**
 * @name 桥调用器
 */

import qxbAppInfo from '../../../common/qxb-app-info/index'

let config = {
  log: false
}
let data = {}
let bridge

/**
 * @name 安卓桥适配
 * @return {Object} 桥
 */
function androidJavascriptBridge() {
  const AndroidAPIHandler = []
  const JsResponseHandler = []

  /**
   * @name 调用回调
   * @description 对应callHandler
   * @param {String} id 标识
   * @param {String} name 名称
   * @param {Any} params 参数
   */
  const androidInvokeCallbackJS = (id, name, params) => {
    name = transformName(name)

    for (let i = 0; i < AndroidAPIHandler.length; i++) {
      if (AndroidAPIHandler[i].fun === name && AndroidAPIHandler[i].id === id) {
        AndroidAPIHandler[i].callback(params)
      }
    }
  }
  /**
   * @name 调用回调
   * @description 对应registerHandler
   * @param {String} name 名称
   * @param {Any} params 参数
   */
  const androidDirectInvoke = (name, params) => {
    for (let i = 0; i < JsResponseHandler.length; i++) {
      if (JsResponseHandler[i].fun === name) {
        JsResponseHandler[i].callback(params)
      }
    }
  }

  /**
   * @name 调用
   * @param {String} name 名称
   * @param {Object} params 参数
   * @param {Function} callback 回调
   */
  const callHandler = (name, params, callback) => {
    let callbackId = Date.now().toString()
    name = transformName(name)

    AndroidAPIHandler.push({ id: callbackId, fun: name, callback })
    window.AndroidAPI[name](callbackId, JSON.stringify(params))
  }
  /**
   * @name 注册
   * @param {String} name 名称
   * @param {Function} callback 回调
   */
  const registerHandler = (name, callback) => {
    JsResponseHandler.push({ fun: name, callback })
  }

  window.androidDirectInvoke = androidDirectInvoke
  window.androidInvokeCallbackJS = androidInvokeCallbackJS

  return { callHandler, registerHandler }
}

/**
 * @name 名称转换
 * @param {String} name 名称
 * @return {String} 转换后名称
 */
function transformName(name) {
  return name.replace(/\./g, '_')
}
/**
 * @name 初始化
 * @param {Function} callback 回调函数
 */
function initiate(callback) {
  let info = qxbAppInfo()
  if (info) {
    data.os = info.client || ''
  }

  if (window.WebViewJavascriptBridge) {
    // ios
    return callback(window.WebViewJavascriptBridge)
  } else if (window.AndroidAPI) {
    // android
    return callback(androidJavascriptBridge())
  } else if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  } else {
    window.WVJBCallbacks = [callback]
    let WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }
}
/**
 * @name 调用
 * @param {String} name 名称
 * @param {Obejct} params 参数
 * @return {Any} [P] 回调数据
 */
function call(name, params = {}) {
  return new Promise((resolve, reject) => {
    ready().then(bridge => {
      if (config.log) {
        console.debug('[Bridge call]', name, '\nparams: ', params) // eslint-disable-line
      }

      try {
        bridge.callHandler(name, params, res => {
          if (config.log) {
            console.debug('[Bridge callback]', name, '\nres: ', res) // eslint-disable-line
          }

          resolve(res)
        })
      } catch (er) {
        reject(er)
      }
    })
  })
}
/**
 * @name 注册
 * @param {String} name 名称
 * @param {Function} callback 回调函数。传入data，responseCallback
 */
function register(name, callback) {
  ready().then(bridge => {
    if (config.log) {
      console.debug('[Bridge register]', name) // eslint-disable-line
    }

    bridge.registerHandler(name, (res, responseCallback) => {
      if (config.log) {
        console.debug('[Bridge callback]', name, '\nres: ', res) // eslint-disable-line
      }

      callback(res, responseCallback)
    })
  })
}

/**
 * @name 准备
 * @return {Object} [P] 桥调用器
 */
function ready() {
  return new Promise(resolve => {
    if (bridge) {
      resolve(bridge)
    } else {
      initiate(adapter => {
        bridge = adapter

        bridge.registerHandler('onLoadJavascriptHandler', res => {
          Object.assign(data, res)
        })

        resolve(bridge)
      })
    }
  })
}

export { config, data, ready, call, register }
