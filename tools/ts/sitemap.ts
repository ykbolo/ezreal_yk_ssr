const fs = require('fs')
const mysql = require('mysql')
const config = require('../../config/mysql')
const db = mysql.createConnection(config)
const XMLWriter = require('xml-writer')
const dayjs = require('dayjs')
const prefix = 'http://ezreal-yk.cn/detail/'
/**
 * 写xml
 */
const writeUrlTagInXML = (urlSetTag, locText, time) => {
  urlSetTag.startElement('url', '').writeElement('loc', locText).writeElement('lastmod', time).endElement()
}
db.connect((err: Object) => {
  if (err) throw err
  console.log('数据库连接成功！')
  db.query('select * from tb_techs', (err, res) => {
    console.log(res)
    // ----------------xml生成开始
    const xw = new XMLWriter()
    xw.startDocument('1.0', 'UTF-8')
    const urlSetTag = xw.startElement('urlset')
    const siteMapArr: any = res
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const timeStamp = dayjs().unix()
    for (let i = 0; i < siteMapArr.length; i++) {
      writeUrlTagInXML(urlSetTag, prefix + siteMapArr[i]['md5'], time)
    }
    xw.endDocument()
    fs.writeFile(`webc_pc_${timeStamp}.xml`, xw.toString(), { flag: 'w' }, (): void => {
      console.log(`****sitemap文件已生成->webc_pc_${timeStamp}.xml`)
    })
  })
})
