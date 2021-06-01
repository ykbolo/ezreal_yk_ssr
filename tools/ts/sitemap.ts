const fs = require('fs').promises
var path = require('path') //解析需要遍历的文件夹
const express = require('express')
const app: Object = express()
const mysql = require('mysql')
const config = require('../../config/mysql')
const db = mysql.createConnection(config)
const md5 = require('md5-node')
db.connect((err: Object) => {
  if (err) throw err
  console.log('数据库连接成功！')
})

console.log(process.argv)
let prefix = process.argv?.[2]
let getArticles = () => {
  interface resObj {
    md5: string
  }
  db.query(`select * from tb_techs`, (err: Object, res: Array<resObj>): void => {
    if (err) throw err
    let count = res.length
    let md5List: string[] = []
    fs.writeFile('./sitemap.txt', '')
    writeCommonPage()
    res.forEach(element => {
      // interface element {
      //   md5?: string
      // }
      md5List.push(element.md5)
      writeSiteMap(element.md5)
    })
    console.log(count, md5List)
  })
}
let writeCommonPage = () => {
  fs.writeFile('./sitemap.txt', prefix + ' ' + 'http://www.ezreal-yk.cn/mood' + '\n', { flag: 'a' })
}
let writeSiteMap = (txt: String): void => {
  fs.writeFile('./sitemap.txt', prefix + ' ' + 'http://www.ezreal-yk.cn/detail/' + txt + '\n', { flag: 'a' })
}
getArticles()
