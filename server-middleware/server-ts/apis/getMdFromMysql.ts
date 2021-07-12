/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 15:22:01
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-12 18:15:20
 */
import express from 'express'
import mysql from 'mysql'
import config from '../../../config/mysql'

const router = express.Router()

const db = mysql.createConnection(config)

db.connect(err => {
  if (err) {
    throw err
  }
})

const queryItems = params => {
  const [start, hit] = [+params.start, +params.hit]
  return new Promise(resolve => {
    db.query(`select * from tb_techs ORDER BY time DESC LIMIT ${start},${hit};`, (err, result) => {
      if (err) {
        throw err
      }
      resolve(result)
    })
  })
}
const queryCount = () => {
  return new Promise(resolve => {
    db.query('select count(*) from tb_techs', (err, result) => {
      if (err) {
        throw err
      }
      resolve(result[0]['count(*)'])
    })
  })
}
function getMdFromMysql(params, res) {
  Promise.all([queryItems(params), queryCount()]).then(([items, total]) => {
    res.send({
      total,
      items
    })
  })
}

router.post('/getMdFromMysql', function (req, res) {
  getMdFromMysql(req.body, res)
})
module.exports = router
