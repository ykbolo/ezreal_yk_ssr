import express from 'express'
import moment from 'moment'
import mysql from 'mysql'
import config from '../../config/mysql'
import md5 from 'md5-node'
import middleware from '../middleware/index'
const router = express.Router()

const db = mysql.createConnection(config)

db.connect(err => {
  if (err) {
    throw err
  }
})

function addSubmit(params, req, res) {
  let time = moment().format('YYYY-MM-DD HH:mm:ss')
  console.log(req.cookies.username)

  let author = req.cookies.username || '匿名用户'
  let images = params.images || []
  let words = params.words
  let sql = `insert into tb_xiabibi (time,words,images,author,md5) values ('${time}',${JSON.stringify(words)},'${JSON.stringify(images)}','${author}','${md5(
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

router.post('/submitToday', middleware.midAuthCheck, function (req, res) {
  addSubmit(req.body, req, res)
})
module.exports = router
