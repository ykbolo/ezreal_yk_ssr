/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 15:22:01
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-24 14:21:44
 */
import { Router } from 'express'
import mysql from 'mysql'
import config from '../../config/mysql'

const router = new Router()

const db = mysql.createConnection(config)

db.connect(err => {
  if (err) {
    throw err
  }
  console.log('数据库连接成功！')
})

const queryItems = params => {
  const [md5] = [params.md5]
  return new Promise((resolve, reject) => {
    db.query(
      // `select * from tb_articles_for_life`,
      `select * from tb_techs where md5='${md5}'`,
      (err, result) => {
        if (err) {
          throw err
        }
        resolve(result)
      }
    )
  })
}
function getMdFromMysql(params, res) {
  Promise.all([queryItems(params)]).then(([result]) => {
    if (result && result.length) {
      let detail = result[0]
      res.send(detail)
    } else {
      res.send({})
    }
  })
}

router.post('/getArticleByMd5', function (req, res, next) {
  console.log(req.body, 11)
  console.log(req.query, 11)
  console.log(req.params, 11)
  // console.log(req)
  getMdFromMysql(req.body, res)
})
export default router
