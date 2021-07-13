/*
 * @Author: Yang Kang
 * @Date: 2021-07-08 18:03:02
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-13 16:43:38
 */
import express from 'express'
import { create } from '../../core/mysql'
import dayjs from 'dayjs'
import md5 from 'md5-node'
const router = express.Router()
const DoPasswordSecret = (password: string): string => {
  return md5(password)
}
const register = async (req, res) => {
  const pool = await create()

  let { phone, password, username } = req.body
  const countAwait = await pool.query(`select count(1) from tb_user where phone=${phone};`)
  const count = countAwait?.[0]?.[0]?.['count(1)']
  if (+count > 0) {
    res.send({
      status: 0,
      message: '当前手机号已被注册'
    })
    return
  }
  const createtime = dayjs().format('YYYY-MM-DD')
  if (phone && password) {
    await pool.query(
      `insert into tb_user (password,username,createtime,phone) values ('${DoPasswordSecret(password)}','${username}','${createtime}','${phone}')`
    )
    res.send({
      status: 1,
      message: '注册成功'
    })
  }
}

router.post('/register', function (req, res) {
  register(req, res)
})
module.exports = router
