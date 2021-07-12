/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 15:22:01
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-06-09 15:07:51
 */
import fs from 'fs'
import path from 'path'
import express from 'express'

import config from '../../../config/service'
const router = express.Router()

router.post('/getPicsFromServer', function (req, res) {
  let [keyword] = [req.body.keyword]
  keyword = 'jinbao'
  const pathName = path.resolve(__dirname, `../../assets/pics/${keyword}`)

  fs.readdir(pathName, (err, files) => {
    if (err) {
      throw err
    }
    let total = files.length

    let items = []
    files.forEach(file => {
      items.push(config.hostIp + `assets/pics/${keyword}/` + file)
    })
    res.send({
      total,
      items
    })
  })
})
module.exports = router
