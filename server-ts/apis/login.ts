/*
 * @Author: Yang Kang
 * @Date: 2021-07-08 18:03:02
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-13 16:42:55
 */
import express from 'express'
import { create } from '../../core/mysql'
import _ from 'lodash'
import { RowDataPacket } from 'mysql2'
import md5 from 'md5-node'
const router = express.Router()
interface User extends RowDataPacket {
  username: string
}

const DoUserNotExist = async (req, res) => {
  const pool = await create()
  const phone = req.body?.phone || ''

  const userAwait = await pool.query(`select count(*) from tb_user where phone=${phone}`)

  return +userAwait?.[0]?.[0]?.['count(*)'] === 0
}

const DoPasswordSecret = (password: string): string => {
  return md5(password)
}

const login = async (req, res) => {
  const pool = await create()
  // 校验有无用户
  const noUser = await DoUserNotExist(req, res)

  if (noUser) {
    res.send({
      status: 1,
      message: '没有该用户'
    })
    return
  }
  // 校验密码
  const { phone, password } = req.body
  const userAwait = await pool.query(`select * from tb_user where phone=${phone}`)

  const passwordError = DoPasswordSecret(password) !== userAwait?.[0]?.[0]?.password

  if (passwordError) {
    res.send({
      status: 1,
      message: '密码错误'
    })
    return
  }
  // 登录成功
  let theUser: any = _.pick(userAwait[0][0], ['username'])
  req.session.username = theUser.username || '匿名用户'
  // 如果前端没有设置cookie，或者cookie已经过期
  if (!req.cookies.token || req.cookies.token !== req.sessionID) {
    res.clearCookie('token')
    res.clearCookie('username')
    res.cookie('token', req.sessionID, { maxAge: 86400, httpOnly: false, sameSite: 'Lax', secure: false })
    res.cookie('username', req.session.username, { maxAge: 86400, httpOnly: false, sameSite: 'Lax', secure: false })
  }
  res.send({
    status: 1,
    user: theUser || '匿名用户',
    message: '登录成功'
  })
}

router.post('/login', function (req, res) {
  login(req, res)
})
module.exports = router
