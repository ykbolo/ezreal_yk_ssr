/**
 * @name 滚动穿透锁定
 * @description 通过设置body为fixed来解决模态框滚动穿透问题。导出了bodyStyle，可以在锁定时修改释放后body的位置
 */

let bodyStyle = {
  position: '',
  scrollTop: 0,
  top: 0
}
let stack = 0

/**
 * @name 锁定body
 */
const fixedBody = () => {
  stack++

  if (stack > 1) {
    return
  }

  bodyStyle.position = document.body.style.position
  bodyStyle.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  bodyStyle.top = document.body.style.top
  document.body.style.position = 'fixed'
  document.body.style.top = `-${bodyStyle.scrollTop}px`
}

/**
 * @name 释放body
 */
const looseBody = () => {
  if (stack > 1) {
    stack = Math.max(stack - 1, 0)

    return
  }

  stack = Math.max(stack - 1, 0)

  document.body.style.position = bodyStyle.position
  document.documentElement.scrollTop = bodyStyle.scrollTop
  document.body.scrollTop = bodyStyle.scrollTop
  document.body.style.top = bodyStyle.top
}

export default { fixedBody, looseBody, bodyStyle }
