/*
 * @Author: Yang Kang
 * @Date: 2021-05-06 15:22:01
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-25 17:36:29
 */

const express = require('express')
const router = express.Router()
const multer = require('multer')
const md5 = require('md5-node')
// var upload = multer({ dest: './public/img' }).any()
let filename = ''

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //    指定文件存放路径
    cb(null, './assets/mood/imgs')
  },
  filename: function (req, file, cb) {
    // 指定文件名,先获取扩展,随机生成文件名保存给保存文件的方法
    //获取文件扩展名
    let exts = file.originalname.split('.')
    let ext = exts[exts.length - 1] //为了防止上传图片时,图片的名称中含多个点,从后面取最后一个解决问题
    let tmpname = Date.now() + parseInt(Math.random() * 9999) //时间戳+随机数生成文件名
    filename = `${md5(tmpname)}.${ext}`
    cb(null, `${md5(tmpname)}.${ext}`)
  }
})
let upload = multer({ storage: storage })
//单个文件上传
router.post('/uploadImage', upload.any(), (req, res) => {
  console.log(req.files)
  let file = req.files?.[0]
  // let fis = file.path.split('\\')
  // let filename = fis[fis.length - 1]
  res.json({
    code: '0000',
    type: 'single',
    originalname: file.originalname,
    path: file.path,
    filename: filename,
    filenameOnline: `http://112.124.56.144/assets/mood/imgs/${filename}`
  })
})

export default router
