/**
 * @name 字符串校验
 */

/**
 * @name 校验非空
 * @param {String} v 值
 * @return {Boolean} 结果
 */
const required = v => {
  return v.length > 0
}
/**
 * @name 校验数字
 * @param {String} v 值
 * @return {Boolean} 结果
 */
const number = v => {
  const pattern = /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/

  return pattern.test(v)
}
/**
 * @name 校验整数
 * @param {String} v 值
 * @param {Number} length 长度
 * @return {Boolean} 结果
 */
const integer = (v, { length = 0 } = {}) => {
  const pattern = /^\d*$/

  if (length > 0) {
    return v.length === length && pattern.test(v)
  } else {
    return pattern.test(v)
  }
}
/**
 * @name 校验非空
 * @param {String} v 值
 * @return {Boolean} 结果
 */
/**
 * @name 校验手机号
 * @param {String} v 值
 * @return {Boolean} 结果
 */
const mobile = v => {
  const pattern = /^1[3|4|5|6|7|8|9]\d{9}$/

  return pattern.test(v)
}
/**
 * @name 校验座机号
 * @param {String} v 值
 * @return {Boolean} 结果
 */
const tele = v => {
  const pattern = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,8}((-\d{1,5})|\(\d{1,5}\))?$/

  return pattern.test(v)
}
/**
 * @name 校验电话
 * @param {String} v 值
 * @return {Boolean} 结果
 */
const phone = v => {
  return mobile(v) || tele(v)
}
/**
 * @name 校验邮箱
 * @param {String} v 值
 * @return {Boolean} 结果
 */
const email = v => {
  const pattern = /^(([^<>()[\]\\.,;:\s@\"\u4e00-\u9fa5\u0800-\u4e00\u3130-\u318F\uAC00-\uD7A3\uFF00-\uFFFF]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line

  return pattern.test(v)
}
/**
 * @name 校验网址
 * @param {String} v 值
 * @return {Boolean} 结果
 */
const website = v => {
  const pattern = /((https?):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&amp;:/~+#]*[\w\-@?^=%&amp;/~+#])?/

  return pattern.test(v)
}

const methods = {
  required,
  number,
  integer,
  mobile,
  tele,
  phone,
  email,
  website
}

/**
 * @name 校验
 * @description 可链式调用方法
 */
class Validator {
  /**
   * @name 构造方法
   * @param {String} v 值
   */
  constructor(value) {
    if (typeof value !== 'string') {
      throw new Error('value is not string')
    }

    this.value = value
    this.result = true
  }
}
for (let a of Object.keys(methods)) {
  Validator.prototype[a] = function (option) {
    this.result = this.result && methods[a](this.value, option)

    return this
  }
}

/**
 * @name 校验
 * @param {String} v 值
 */
const validate = v => {
  return new Validator(v)
}
validate.methods = { required, number, integer, mobile, tele, phone, email, website }

export default validate
