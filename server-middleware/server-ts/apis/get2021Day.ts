import express from 'express'
import mysql from 'mysql'
import config from '../../../config/mysql'
import moment from 'moment'

const router = express.Router()

const db = mysql.createConnection(config)

db.connect(err => {
  if (err) {
    throw err
  }
})
router.post('/get2021Day', function (req, res) {
  let date = moment().format('YYYY-MM-DD')

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
})
module.exports = router
