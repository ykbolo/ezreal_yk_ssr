import express from 'express'
import session from './apis/session/session'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()

declare module 'express' {}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.all('*', function (req, res, next) {
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('X-Powered-By', '3.2.1')
  next()
})
app.use(
  cors({
    maxAge: 84600,
    credentials: true,
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://ezreal-yk.cn']
  })
)
app.use(session)
app.use('/api', require('./apis/getMdFromMysql'))
app.use('/api', require('./apis/getPicsFromServer'))
app.use('/api', require('./apis/getArticleByMd5'))
app.use('/api', require('./apis/get2021Day'))
app.use('/api', require('./apis/uploadImage'))
app.use('/api', require('./apis/submitToday'))
app.use('/api', require('./apis/getSubmitsFromMysql'))
app.use('/api', require('./apis/searchMds'))
app.use('/api', require('./apis/getPicJson'))
app.use('/api', require('./apis/register'))
app.use('/api', require('./apis/login'))
app.use('/api', require('./apis/getLobosVideos'))
app.listen(9003)
