/*
 * @Author: Yang Kang
 * @Date: 2021-06-01 11:17:03
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-06-01 11:50:30
 */
/*
 * @Author: Yang Kang
 * @Date: 2021-05-12 16:01:44
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-28 17:10:04
 */
/* eslint-disable */
const fs = require('fs').promises
var path = require('path') //解析需要遍历的文件夹
const express = require('express')
const app = express()
const mysql = require('mysql')
const config = require('../config/mysql')
const db = mysql.createConnection(config)
const md5 = require('md5-node')
db.connect(err => {
  if (err) throw err
  console.log('数据库连接成功！')
})

console.log(process.argv)
let prefix = process.argv?.[2]
let getArticles = () => {
  db.query(`select * from tb_techs`, (err, res) => {
    if (err) throw err
    let count = res.length
    let md5List = []
    fs.writeFile('./sitemap.txt', '')
    writeCommonPage()
    res.forEach(element => {
      md5List.push(element.md5)
      writeSiteMap(element.md5)
    })
    console.log(count, md5List)
  })
}
let writeCommonPage = () => {
  fs.writeFile('./sitemap.txt', prefix + ' ' + 'http://www.ezreal-yk.cn/mood' + '\n', { flag: 'a' })
}
let writeSiteMap = txt => {
  fs.writeFile('./sitemap.txt', prefix + ' ' + 'http://www.ezreal-yk.cn/detail/' + txt + '\n', { flag: 'a' })
}
getArticles()
