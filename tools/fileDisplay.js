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

var filePath = path.resolve('./assets/techs')
let arr = []

async function fileDisplay(filePath, result) {
  try {
    let files = await fs.readdir(filePath)

    for (let a of files) {
      let filedir = path.resolve(filePath, a)
      console.log(a)
      let stat = await fs.stat(filedir)
      if (stat.isFile()) {
        let content = await fs.readFile(filedir, 'utf-8')
        result.push({ name: 'filedir', content, title: a })
      } else {
        await fileDisplay(filedir, result)
      }
    }
    return result
  } catch (er) {
    console.warn(er)
  }
}

fileDisplay('./assets/techs', []).then(contentArr => {
  console.log(contentArr.length)
  db.query(`TRUNCATE table tb_techs`, () => {
    autoInsert(0, contentArr)
  })
})
function autoInsert(index, contentArr) {
  // console.log(index, contentArr)
  // console.log()
  if (index >= contentArr.length) {
    process.exit()
    // return ''
  } else {
    // console.log(contentArr[index].content)
    let content = contentArr[index].content
    let title = contentArr[index].title?.replace(/(\d+\.)/, '').replace('.md', '')
    let time = content.split('\n')[2]?.match(/\d+\.\d+\.\d+/)[0]
    db.query(
      `insert into tb_techs (content,title,time,md5) values (${JSON.stringify(contentArr[index].content)},${JSON.stringify(title)},${JSON.stringify(
        time
      )},${JSON.stringify(md5(title))})`,
      (err, res) => {
        if (err) throw err
        autoInsert(index + 1, contentArr)
      }
    )
  }
}
