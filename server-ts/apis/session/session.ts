/*
 * @Author: Yang Kang
 * @Date: 2021-07-09 15:59:49
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-09 16:37:15
 */
/**
 * Created by Wu Jian Ping on - 2017/06/15.
 */
import session from 'express-session'

export default session({
  name: '111',
  resave: false,
  saveUninitialized: false,
  secret: 'ezreal-yk'
})
