/**
 * @name 获取APP信息
 * @description 需要QXB UA。{version, type, client, vip, deviceId}
 */

/**
 * @name 启信宝应用信息
 * @param {String} raw 用户代理字符串
 */
const qxbAppInfo = ua => {
  if (ua === undefined) {
    if (window.navigator) {
      ua = window.navigator.userAgent
    } else {
      ua = ''
    }
  }

  ua = ((ua.match(/QiXin\([^)]*\)/gi) || []) + '').replace('QiXin(', '{').replace(')', '}')
  ua = ua ? JSON.parse(ua) : {}
  let result = {
    version: ua.ver,
    type: ua.stype,
    client: ua.client,
    vip: ua.isVIP === '1',
    vipStatus: ua.isVIP,
    deviceId: ua.deviceId
  }

  return result
}

export default qxbAppInfo
