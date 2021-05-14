/**
 * @name 启信宝APP桥
 * @dependency window
 */

import { config, data, ready, call, register } from './parts/core'

/**
 * @name 判断安卓
 * @return {Boolean} 结果
 */
const isAndroid = () => /android/i.test(data.os)

/**
 * @name 路由
 * @param {String} path 路径
 */
function route(path) {
  call('QXB.Router', { router: encodeURIComponent(`qxb://${path}`) })
}
/**
 * @name 打开新webview
 * @param {String} url 地址
 * @param {String} title 标题
 */
function open(url, title) {
  route(`system/webview?content=${encodeURIComponent(url)}&title=${title}`)
}
/**
 * @name 关闭
 */
function close() {
  call('QXB.Common.CloseWebView')
}
/**
 * @name 设置标题
 * @param {String} title 标题
 */
function setTitle(title) {
  call('QXB.Title.Change', title)
}
/**
 * @name 登录
 */
function showLogin() {
  call('QXB.Common.Get.Login.Status')
}
/**
 * @name 显示VIP购买弹窗
 * @param {String} from 700新增参数from，用于VIP Dialog中的H5 query参数。如果from为空，则from参数从配置或者客户端本地取
 * @param {Boolean} close android:690、ios:693新增参数needClose，可由web端控制客户端vip弹窗关闭时是否退出当前页面
 * @param {Boolean} refresh 700新增参数needRefresh，用于控制页面购买vip后是否需要刷新页面，默认为true，原找关系页面与svip购买成功后不会刷新
 */
function showVipPurchaseDialog({ from, close = false, refresh = false } = {}) {
  call('QXB.Chart.To.Be.VIP.Dialog', { from, needClose: close, needRefresh: refresh })
}
/**
 * @name 获取用户信息
 * @return {Object} 用户信息
 *    isLogin: 登录状态 Number[0, 1]
 *    userId: 用户代号 String
 *    userName: 用户名 String
 *    new_token: 用户令牌 String @6.8.5
 *    isVip: VIP状态 Number[0, 1]
 *    vipStartDate: VIP起始日期 String
 *    vipEndDate: VIP结束日期 String
 *    vipId: VIP代号 String
 *    isSvip: SVIP状态 Number[0, 1] @6.6.0
 *    svipStartDate: SVIP起始日期 String @6.6.0
 *    svipEndDate: SVIP结束日期 String @6.6.0
 *    isCCVIP: CCVIP状态 Boolean
 *    ccVipPrice: Object
 *    account: String
 *    phoneNumber: 手机号 String
 *    report_mobile: 报告接收手机号
 *    report_mail: 报告接收邮箱地址
 *    hasInvioceRecord: Boolean
 *    guid: String
 *    track_id: String
 */
async function getUserInfo() {
  let res = await call('QXB.Get.UserInfo')

  if (isAndroid()) {
    res = JSON.parse(res)
  }

  return res
}
/**
 * @name 获取设备信息
 */
async function getDeviceInfo() {
  let res = await call('QXB.Get.DeviceInfo')

  if (isAndroid()) {
    res = JSON.parse(res)
  }

  return res
}
/**
 * @name 获取城市代码
 * @description 如果用户拒绝地理位置授权则无回调
 * @return {String} 城市代码
 */
async function getCityCode() {
  let res = await call('QXB.Get.Area.Code')

  return res
}
/**
 * @name 监控企业
 * @param {Boolean} state 状态。true：添加监控，false：取消监控
 * @param {String} eid 企业编号
 * @param {String} ename 企业名称
 * @param {String} etype 企业类型
 */
async function monitorCompany(state, eid, ename, etype) {
  let res = call('QXB.Company.Monitor', { isMonitor: state ? '1' : '0', eId: eid, eName: ename, eType: etype })

  if (isAndroid()) {
    res = JSON.parse(res)
  }

  return res
}
/**
 * @name 设置分享
 * @param {Boolean} state 状态。true：显示分享按钮，false：隐藏分享按钮
 * @param {String} url 目标地址。state为true时必填
 * @param {String} title 标题。state为true时必填
 * @param {String} description 描述。state为true时必填
 * @param {String} icon 图表地址。state为true时必填
 */
function setShare(state, { url = '', title = '', description = '', icon = '' } = {}) {
  call('QXB.Share.Unite', { shareEnabled: state, shareUrl: url, shareTitle: title, shareDesc: description, shareIconUrl: icon })
}

const methods = { route, open, close, setTitle, showLogin, showVipPurchaseDialog, getUserInfo, getDeviceInfo, getCityCode, monitorCompany, setShare }

export default { config, data, ready, call, register, methods }
