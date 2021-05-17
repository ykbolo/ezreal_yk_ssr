/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 15:22:01
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-17 11:38:12
 */
import fs from 'fs'
import path from 'path'
import { Router } from 'express'

import config from '../../config/service'
const router = new Router()

router.post('/getPicsFromServer', function (req, res, next) {
  let [keyword] = [req.body.keyword]
  keyword = 'jinbao'
  const pathName = path.resolve(__dirname, `../../assets/pics/${keyword}`)
  console.log(path.resolve(__dirname, '../../assets/pics/jinbao'))

  fs.readdir(pathName, (err, files) => {
    if (err) throw err
    console.log(files)
    let total = files.length

    let items = []
    files.forEach((file) => {
      items.push(config.hostIp + `assets/pics/${keyword}/` + file)
    })
    console.log(total, items)
    res.send({
      total,
      items,
    })
  })
})
export default router
