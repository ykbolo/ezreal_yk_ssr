import express from 'express'
import mysql from 'mysql'
import config from '../../config/mysql'

const router = express.Router()

const db = mysql.createConnection(config)

db.connect(err => {
  if (err) {
    throw err
  }
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

router.post('/searchMds', function (req, res) {
  getMdFromMysql(req.body, res)
})
module.exports = router
