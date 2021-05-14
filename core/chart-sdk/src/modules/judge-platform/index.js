/**
 * @name 判断平台
 * @description 现可识别：启信宝（qxb）、名片全能王（cc）、微信（wx）
 */

/**
 * @name 判断平台
 * @param {String} ua 用户代理字符串
 * @return {String} 平台
 */
const judgePlatform = ua => {
  if (ua === undefined) {
    if (window.navigator) {
      ua = window.navigator.userAgent
    } else {
      ua = ''
    }
  }

  let platform = 'browser'
  if (/QiXin/i.test(ua)) {
    platform = 'qxb'
  } else if (/CamCard/i.test(ua)) {
    platform = 'cc'
  } else if (/(MicroMessenger|miniProgram)/i.test(ua)) {
    platform = 'wx'
  }

  return platform
}

export default judgePlatform
