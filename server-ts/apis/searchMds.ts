/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 15:22:01
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-06-09 14:49:48
 */
import express from 'express'
import mysql from 'mysql'
import config from '../../config/mysql'

const router = express.Router()

const db = mysql.createConnection(config)

db.connect(err => {
  if (err) {
    throw err
  }
  console.log('数据库连接成功！')
})

function getMdFromMysql(params, res) {
  let keyword = params.keyword
  db.query(`select * from tb_techs where title like '%${keyword}%'`, (err, result) => {
    if (err) throw err
    res.send({
      total: result.length,
      items: result
    })
  })
}

router.post('/searchMds', function (req, res, next) {
  getMdFromMysql(req.body, res)
})
module.exports = router
