/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 15:01:24
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-06-03 18:12:28
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
app.use('/api', require('./apis/getMdFromMysql'))
app.use('/api', require('./apis/getPicsFromServer'))
app.use('/api', require('./apis/getArticleByMd5'))
app.use('/api', require('./apis/get2021Day'))
app.use('/api', require('./apis/uploadImage'))
app.use('/api', require('./apis/submitToday'))
app.use('/api', require('./apis/getSubmitsFromMysql'))
app.use('/api', require('./apis/searchMds'))
// // app.use('/apis/getMdFromLocal', require('./apis/getMdFromLocal'))
app.get('/getMdFromLocal', function (req, res, next) {
  res.end(
    JSON.stringify({
      body: homedir
    })
  )
})
app.listen(9003)
