/*
 * @Author: Yang Kang
 * @Date: 2021-05-12 16:24:31
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-05-12 16:25:22
 */
//从指定目录复制指定类型文件出来
let { mkDir, extractFiles } = require('./read-suffix.js')

extractFiles('./assets/mds', 'md') //复制shenlingqiyue文件夹(包括里边的所有子文件夹)里所有的png图片,到新的目录里
