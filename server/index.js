/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 15:01:24
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-06 16:11:02
 */
// const fs = require('fs')
// const path = require('path')
const os = require('os')
const express = require('express')
const app = express()

const homedir = os.homedir()
// app.use('/apis/getMdFromLocal', require('./apis/getMdFromLocal'))
app.get('/getMdFromLocal', function (req, res, next) {
  console.log(homedir)
  // const data = fs.readFileSync(path.resolve(homedir), 'utf-8')
  res.end(
    JSON.stringify({
      body: homedir,
    })
  )
})
app.listen(9003)
