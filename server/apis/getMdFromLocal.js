/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 15:22:01
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-13 16:15:32
 */
import { Router } from 'express'
import mysql from 'mysql'
import config from '../../config/mysql'

const router = new Router()

const db = mysql.createConnection(config)

db.connect((err) => {
  if (err) throw err
  console.log('数据库连接成功！')
})

const queryItems = (params) => {
  const [start, hit] = [+params.start, +params.hit]
  return new Promise((resolve, reject) => {
    db.query(
      // `select * from tb_articles_for_life`,
      `select * from tb_articles_for_life LIMIT ${start},${hit};`,
      (err, result) => {
        if (err) throw err
        resolve(result)
      }
    )
  })
}
const queryCount = (params) => {
  return new Promise((resolve, reject) => {
    db.query('select count(*) from tb_articles_for_life', (err, result) => {
      if (err) throw err
      resolve(result[0]['count(*)'])
    })
  })
}
const queryHasNextPage = (params) => {
  return new Promise((resolve, reject) => {
    db.query(
      'select count(*) from tb_articles_for_life where id>2',
      (err, result) => {
        if (err) throw err
        resolve(result[0]['count(*)'])
      }
    )
  })
}
function getMdFromMysql(params, res) {
  Promise.all([
    queryItems(params),
    queryCount(),
    queryHasNextPage(params),
  ]).then(([items, total]) => {
    res.send({
      total,
      items,
    })
  })
}

router.post('/getMdFromMysql', function (req, res, next) {
  console.log(req.body)
  getMdFromMysql(req.body, res)
})
export default router
