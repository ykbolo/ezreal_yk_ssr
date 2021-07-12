/*
 * @Author: Yang Kang
 * @Date: 2021-07-08 18:03:02
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-09 16:02:18
 */
import express from 'express'
import { create } from '../../core/mysql'
const router = express.Router()

const register = async (req, res) => {
  const pool = await create()
  const countAwait = await pool.query('select count(1) from tb_user;')
  const count = countAwait?.[0]?.[0]?.['count(1)']
  console.log(count)
  const userAwait = await pool.query('select * from tb_user where ;')
  // const [nickyName,]
}

router.post('/register', function (req, res) {
  console.log(req.session)

  register(req, res)
})
module.exports = router
