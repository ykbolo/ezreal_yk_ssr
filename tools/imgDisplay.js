/*
 * @Author: Yang Kang
 * @Date: 2021-05-25 11:25:31
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-25 11:27:15
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

var filePath = path.resolve('./assets/mood/imgs')
let arr = []

async function fileDisplay(filePath, result) {
  try {
    let files = await fs.readdir(filePath)

    for (let a of files) {
      let filedir = path.resolve(filePath, a)

      let stat = await fs.stat(filedir)
      if (stat.isFile()) {
        let content = await fs.readFile(filedir, 'utf-8')
        result.push({ name: 'filedir', content })
      } else {
        await fileDisplay(filedir, result)
      }
    }

    return result
  } catch (er) {
    console.warn(er)
  }
}

fileDisplay('./assets/mood/imgs', []).then(contentArr => {
  console.log(contentArr.length)
  db.query(`delete from tb_techs`, () => {
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
    let title = content.split('\n')[0]
    let time = content.split('\n')[2]

    console.log(title, time, content)
    db.query(
      `insert into tb_techs (id,content,title,time,md5) values (${index},${JSON.stringify(contentArr[index].content)},${JSON.stringify(title)},${JSON.stringify(
        time
      )},md5(title))`,
      (err, res) => {
        if (err) throw err
        autoInsert(index + 1, contentArr)
      }
    )
  }
}
