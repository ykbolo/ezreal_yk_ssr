/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 15:01:24
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-17 11:12:41
 */
// const fs = require('fs')
// const path = require('path')
const os = require('os')
// const path = require('path')
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const homedir = os.homedir()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', require('./apis/getMdFromLocal'))
app.use('/', require('./apis/getPicsFromServer'))
// // app.use('/apis/getMdFromLocal', require('./apis/getMdFromLocal'))
app.get('/getMdFromLocal', function (req, res, next) {
  console.log(homedir)
  console.log(__dirname, './assets/mds/')
  // path.dirname(__dirname)
  // const data = fs.readFileSync(path.resolve(homedir), 'utf-8')
  res.end(
    JSON.stringify({
      body: homedir,
    })
  )
})
app.listen(9003)
