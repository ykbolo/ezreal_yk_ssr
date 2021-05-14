import { cloneDeep, replace, split, forEach } from 'lodash-es'

// 字体需根据实际情况配置
let getTextWidth = (text, fontSize) => {
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')
  context.font =
    fontSize +
    'px -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Segoe UI, Arial, Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft Yahei", sans-serif'
  return context.measureText(text).width
}
let cutTextForRow = (text, fontSize, maxWidth, row) => {
  let result = []
  let remainText = cloneDeep(text)
  let fullWidth = getTextWidth(text, fontSize)
  if (fullWidth > maxWidth) {
    let fullRow = Math.ceil(fullWidth / maxWidth)
    for (let a = 1; a <= fullRow; a++) {
      if (a === row) {
        result.push(getTextForMaxWidth(remainText, fontSize, maxWidth, true))
        break
      } else {
        let cText = getTextForMaxWidth(remainText, fontSize, maxWidth, false)
        remainText = replace(remainText, cText, '')
        result.push(cText)
      }
    }
  } else {
    result.push(text)
  }
  return result
}
let getTextForMaxWidth = (text, fontSize, maxWidth, needEllipsis) => {
  let arr = split(text, '')
  let str = ''
  let resultStr = ''
  let backupStr = ''
  forEach(arr, word => {
    str += word
    let width = getTextWidth(str, fontSize)
    if (width > maxWidth && !resultStr) {
      resultStr = str.substring(0, str.length - 1)
      if (needEllipsis) {
        resultStr = resultStr.substring(0, resultStr.length - 1) + '...'
      }
    } else {
      backupStr = str
    }
  })
  return resultStr || backupStr
}

export default {
  getTextWidth,
  cutTextForRow
}
