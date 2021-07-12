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
  const [md5] = [params.md5]
  return new Promise(resolve => {
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
const queryPreNext = id => {
  return new Promise(resolve => {
    db.query(`select * from tb_techs where id=${id - 1} or id=${id + 1}`, (err, result) => {
      if (err) {
        throw err
      }

      let preNext = {
        next: {},
        pre: {}
      }

      if (result && result.length === 1) {
        if (id === 1) {
          preNext.next = { title: result[0].title, md5: result[0].md5 }
        } else {
          preNext.pre = { title: result[0].title, md5: result[0].md5 }
        }
      } else if (result && result.length === 2) {
        preNext.pre = { title: result[0].title, md5: result[0].md5 }
        preNext.next = { title: result[1].title, md5: result[1].md5 }
      }
      resolve(preNext)
    })
  })
}
function getArticleByMd5(params, res) {
  queryItems(params).then(item => {
    let detail = item[0]
    queryPreNext(detail.id).then(preNext => {
      detail.preNext = preNext
      res.send(detail)
    })
  })
}

router.post('/getArticleByMd5', function (req, res, next) {
  getArticleByMd5(req.body, res)
})
module.exports = router
