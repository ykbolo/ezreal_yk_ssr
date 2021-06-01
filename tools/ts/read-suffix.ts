/*
 * @Author: Yang Kang
 * @Date: 2021-05-12 16:22:02
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-12 16:24:23
 */
const fs = require('fs')
module.exports = {
  //创建目录，如果已有则不创建
  mkDir(folderName) {
    return new Promise((resolve, reject) => {
      fs.readdir('./', (err, files) => {
        if (~files.indexOf(folderName)) {
          resolve(folderName)
        } else {
          fs.mkdir(`./${folderName}`, function (err) {
            err && reject(err)
            resolve(folderName)
          })
        }
      })
    })
  },
  //复制文件
  copyFile(targetFiledir, output) {
    let buf = fs.readFileSync(targetFiledir)
    fs.writeFile(output, buf, function (error) {
      if (error) {
        console.log(error)
        throw error
      } else {
        console.log('文件已保存')
      }
    })
  },
  //提取一个目录文件夹里指定类型（如：同一后缀名）的文件
  extractFiles(folderTarget, format) {
    let path = require('path') //path模块
    let folderNew = `${folderTarget}_${format}`
    let _this = module.exports

    const ergodicDir = (Path, folderNameNew, format) => {
      fs.readdir(Path, (err, files) => {
        err && console.warn('路径读取出错', err)
        //遍历读取到的文件列表
        files.forEach((filename) => {
          let filedir = path.join(Path, filename) //完整的路径

          //根据文件路径获取文件信息，返回一个fs.Stats对象
          fs.stat(filedir, (error, stats) => {
            error && console.warn('获取文件stats失败', error)
            let isFile = stats.isFile() //是文件
            let isDir = stats.isDirectory() //是文件夹
            if (isFile) {
              if (filename.split('.').pop().toLowerCase() === format) {
                _this.copyFile(filedir, `${folderNameNew}/${filename}`) //复制文件
              }
            }
            isDir && ergodicDir(filedir, folderNameNew, format) //递归，如果是文件夹，就继续遍历该文件夹下面的文件
          })
        })
      })
    }

    _this.mkDir(folderNew).then(() => {
      //先创建目录

      let Path = path.resolve(`./${folderTarget}`) //获取绝对路径
      ergodicDir(Path, folderNew, format)
    })
  },
}
