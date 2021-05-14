/**
 * @name 兼容node
 * @description 在node环境中window设置为一个空对象
 */

if (typeof window === 'undefined') {
  global.window = {}
}
