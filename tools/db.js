/*
 * @Author: Yang Kang
 * @Date: 2021-05-12 18:27:20
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-12 19:08:52
 */
/*
 * @Author: Yang Kang
 * @Date: 2021-05-12 16:01:44
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-12 18:26:56
 */
/* eslint-disable */
const mysql = require('mysql')
const config = require('../config/mysql')

const result = require('./fileDisplay')
const db = mysql.createConnection(config)
db.connect((err) => {
  if (err) throw err
  console.log('success')
})

function insertMds() {
  console.log(result)
  // db.query(`insert`)
}
insertMds()
