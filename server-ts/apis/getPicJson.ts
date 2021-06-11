/*
 * @Author: Yang Kang
 * @Date: 2021-06-11 16:40:46
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-06-11 17:55:32
 */
import express from 'express'
import path from 'path'
const fs = require('fs').promises

const router = express.Router()

var directory = {
  path: './assets/pics',
  name: '图片库',
  children: []
}
async function loadTree(filePath, obj) {
  let files = await fs.readdir(filePath)
  // console.log(files)

  for (let a of files) {
    let filedir = filePath + '/' + a
    // console.log(a)
    let ob = { path: filedir, name: a, children: [] }
    obj.children.push(ob)
    let stat = await fs.stat(filedir)
    if (!stat.isFile()) {
      // filePath =
      await loadTree(filePath + '/' + a, ob)
    }
  }
}

router.post('/getPicJson', function (req, res) {
  loadTree('./assets/pics', directory).then(() => {
    res.send({
      prePath: 'http://ezreal-yk.cn',
      dir: directory
    })
  })
})
module.exports = router
