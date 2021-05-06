/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 15:22:01
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-06 16:04:13
 */
const fs = require('fs')
const path = require('path')
const os = require('os')

const express = require('express')
const router = express.Router()
const homedir = os.homedir()
router.post('/getMdFromLocal', function (req, res, next) {
  console.log(homedir)
  const data = fs.readFileSync(path.resolve(homedir), 'utf-8')
  res.end(
    JSON.stringify({
      body: data,
    })
  )
})
