/*
 * @Author: Yang Kang
 * @Date: 2021-07-09 15:59:49
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-13 17:56:09
 */
/**
 * Created by Wu Jian Ping on - 2017/06/15.
 */
import session from 'express-session'

export default session({
  name: 'token',
  resave: false,
  saveUninitialized: false,
  secret: 'ezreal-yk',
  cookie: {
    signed: false,
    maxAge: 1000 * 60 * 10 // 设置 session 的有效时间，单位毫秒
  }
})
