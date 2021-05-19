/*
 * @Author: Yang Kang
 * @Date: 2021-05-19 11:45:39
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-19 12:04:28
 */
/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 15:22:01
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-18 16:45:51
 */
import { Router } from 'express'
import mysql from 'mysql'
import config from '../../config/mysql'
import moment from 'moment'

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
      `select * from tb_articles_for_life where md5='${md5}'`,
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
  let date = moment().format('YYYY-MM-DD')
  date = '2021-05-22'

  db.query(`select * from 2021_day where time like '${date}%'`, (err, result) => {
    if (err) {
      throw err
    } else {
      if (result && result.length) {
        if (+result[0].value === 0) {
          // 工作日
          res.send({
            date: date,
            message: '工作日',
            value: 0,
            isWork: true
          })
        } else if (+result[0].value === 1) {
          //法定节假日
          res.send({
            date: date,
            message: '法定节假日',
            value: 1,
            isWork: false
          })
        } else if (+result[0].value === 2) {
          //休息日加班
          res.send({
            date: date,
            message: '休息日加班',
            value: 2,
            isWork: true
          })
        } else if (+result[0].value === 3) {
          //休息日
          res.send({
            date: date,
            message: '休息日',
            value: 3,
            isWork: false
          })
        }
      } else {
        res.send({
          date: date,
          message: '暂无结果',
          value: null,
          isWork: true
        })
      }
    }
  })
  // Promise.all([queryItems(params)]).then(([result]) => {
  //   if (result && result.length) {
  //     let detail = result[0]
  //     res.send(detail)
  //   } else {
  //     res.send({})
  //   }
  // })
}

router.post('/get2021Day', function (req, res, next) {
  getMdFromMysql(req.body, res)
})
export default router
