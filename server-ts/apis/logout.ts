/*
 * @Author: Yang Kang
 * @Date: 2021-07-08 18:03:02
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-15 18:33:28
 */
import express from 'express'
// import { create } from '../../core/mysql'
// import _ from 'lodash'
// import { RowDataPacket } from 'mysql2'
// import md5 from 'md5-node'
const router = express.Router()

router.post('/logout', function (req, res) {
  req.session.destroy(() => {
    res.clearCookie('token')
    res.clearCookie('username')
    res.end()
  })
})
module.exports = router
