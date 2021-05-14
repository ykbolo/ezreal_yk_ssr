/**
 * @name iframe连接
 * @description 兼容ie11。ie10需要安装并引入mutationobserver-shim。
 * @description 预置消息类型：height
 */

import { isIn, sendMessage, sendMessageUntilResponse, sendMessageToTop, filterMessage } from './core/func'
import CenterToEnd from './parts/center-to-end'
import EndToCenter from './parts/end-to-center'

export default { isIn, sendMessage, sendMessageUntilResponse, sendMessageToTop, filterMessage, CenterToEnd, EndToCenter }
