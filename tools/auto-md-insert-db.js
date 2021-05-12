/*
 * @Author: Yang Kang
 * @Date: 2021-05-12 16:01:44
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-12 16:44:28
 */
/* eslint-disable */
const fs = require('fs')
var path = require('path') //解析需要遍历的文件夹
const express = require('express')
const app = express()
const mysql = require('mysql')
const config = require('../config/mysql')
const db = mysql.createConnection(config)

var filePath = path.resolve('./assets/mds')
let arr = []
function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err)
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename)
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败')
          } else {
            var isFile = stats.isFile() //是文件
            var isDir = stats.isDirectory() //是文件夹
            if (isFile) {
              console.log(filedir) // 读取文件内容
              var content = fs.readFileSync(filedir, 'utf-8')
              // console.log(content)
              arr.push({ name: 'filedir', content })
            }
            if (isDir) {
              fileDisplay(filedir) //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        })
      })
    }
  })
}
function dod(callback) {
  //调用文件遍历方法
  fileDisplay(filePath)
  callback()
}
dod(function () {
  console.log(111)
})

// function readFileList(path, filesList) {}

// db.connect((err) => {
//   if (err) throw err
//   console.log('success')
// })
// db.query('select * from tb_articles_for_life', function (err, result) {
//   console.log(err, result)
// })
// db.query('insert  ')
