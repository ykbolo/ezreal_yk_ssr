/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 15:01:24
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-18 09:56:49
 */
// const fs = require('fs')
// const path = require('path')
const os = require('os')
// const path = require('path')
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const homedir = os.homedir()
const cors = require('cors')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/*', cors())
app.use('/api', require('./apis/getMdFromLocal'))
app.use('/api', require('./apis/getPicsFromServer'))
// // app.use('/apis/getMdFromLocal', require('./apis/getMdFromLocal'))
app.get('/getMdFromLocal', function (req, res, next) {
  res.end(
    JSON.stringify({
      body: homedir
    })
  )
})
app.listen(9003)
