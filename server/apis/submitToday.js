/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 15:22:01
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-25 16:31:44
 */
import { Router } from 'express'
import moment from 'moment'
import mysql from 'mysql'
import config from '../../config/mysql'
import md5 from 'md5-node'
const router = new Router()

const db = mysql.createConnection(config)

db.connect(err => {
  if (err) {
    throw err
  }
  console.log('数据库连接成功！')
})

function addSubmit(params, res) {
  let time = moment().format('YYYY-MM-DD HH:mm:ss')
  console.log(time)
  let author = params.author || '匿名'
  let images = params.images || []
  let words = params.words
  let sql = `insert into tb_xiabibi (time,words,images,author,md5) values ('${time}','${JSON.stringify(words)}','${JSON.stringify(images)}','${author}','${md5(
    time
  )}')`
  db.query(sql, (err, result) => {
    if (err) {
      throw err
    }
    if (result) {
      res.send({
        message: '成功'
      })
    }
  })
}

router.post('/submitToday', function (req, res, next) {
  addSubmit(req.body, res)
})
export default router
