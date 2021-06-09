/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 15:22:01
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-06-09 10:06:36
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

const queryItems = params => {
  const [start, hit] = [+params.start, +params.hit]
  return new Promise<{ images: string }[]>((resolve, reject) => {
    db.query(
      // `select * from tb_articles_for_life`,
      `select * from tb_xiabibi LIMIT ${start},${hit};`,
      (err, result) => {
        if (err) {
          throw err
        }
        resolve(result)
      }
    )
  })
}
const queryCount = () => {
  return new Promise((resolve, reject) => {
    db.query('select count(*) from tb_xiabibi', (err, result) => {
      if (err) {
        throw err
      }
      resolve(result[0]['count(*)'])
    })
  })
}
function getMdFromMysql(params, res) {
  Promise.all([queryItems(params), queryCount()]).then(([items, total]) => {
    items.forEach(item => {
      item.images = JSON.parse(item.images)
    })
    res.send({
      total,
      items
    })
  })
}

router.post('/getSubmitsFromMysql', function (req, res, next) {
  console.log(req.body)
  getMdFromMysql(req.body, res)
})
module.exports = router
