import express from 'express'
import path from 'path'
import fs from 'fs'
import _ from 'lodash'
const router = express.Router()
// var biliJson = fs.readFileSync(path.resolve('./bilibili.json'), { encoding: 'utf-8' }).toString()

// const vlist = JSON.parse(biliJson)?.vlist || []
// console.log(vlist)

// _.forEach(vlist, item => {
//   _.pick(item, ['pic', 'author', 'length', 'aid', 'bvid', 'title', 'mid'])
// })
router.post('/getLobosVideos', function (req, res) {
  var biliJson = fs.readFileSync(path.resolve('./bilibili.json'), { encoding: 'utf-8' }).toString()
  const vlist = JSON.parse(biliJson)?.vlist || []
  let items = []
  _.map(vlist, item => {
    item.iframeUrl = `https://player.bilibili.com/player.html?cid=57016129&aid=BV1kx411H73g&bvid=${item.bvid}&page=1&as_wide=1&high_quality=1&danmaku=0&t=30`
    items.push(_.pick(item, ['pic', 'author', 'length', 'aid', 'bvid', 'title', 'mid', 'iframeUrl']))
  })
  res.send({
    status: 1,
    data: {
      items: items,
      total: items.length
    }
  })
})
module.exports = router
