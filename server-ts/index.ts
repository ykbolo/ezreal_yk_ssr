import express from 'express'
// import * as cors from 'cors'

const app = express()

declare module 'express' {}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use('/api/*', cors())
app.use('/api', require('./apis/getMdFromMysql'))
app.use('/api', require('./apis/getPicsFromServer'))
app.use('/api', require('./apis/getArticleByMd5'))
app.use('/api', require('./apis/get2021Day'))
app.use('/api', require('./apis/uploadImage'))
app.use('/api', require('./apis/submitToday'))
app.use('/api', require('./apis/getSubmitsFromMysql'))
app.use('/api', require('./apis/searchMds'))

app.listen(9003)
