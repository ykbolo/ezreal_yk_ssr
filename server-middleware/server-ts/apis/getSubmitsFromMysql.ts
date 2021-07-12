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
  return new Promise<{ images: string }[]>(resolve => {
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
  return new Promise(resolve => {
    db.query('select count(*) from tb_xiabibi', (err, result) => {
      if (err) {
        throw err
      }
      resolve(result[0]['count(*)'])
    })
  })
}
function getSubmitsFromMysql(params, res) {
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

router.post('/getSubmitsFromMysql', function (req, res) {
  getSubmitsFromMysql(req.body, res)
})
module.exports = router
