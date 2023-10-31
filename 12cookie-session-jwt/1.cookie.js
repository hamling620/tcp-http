const express = require('express')
const cookieParser = require('./cookie-parser')

const app = express()
// http模块中的req res设置和获取cookie的方法
// res.setHeader('set-cookie', ['name=hamling', 'age=10'])
// req.headers.cookie

const secret = 'hellohamling'

app.use(cookieParser(secret))

app.get('/write', (req, res) => {
  res.cookie('name', 'hamling', {
    signed: true,
    httpOnly: false,
    // maxAge: 20,
    path: '/',
    domain: 'localhost',
    // expires: new Date(Date.now() + 20 * 1000)
  })
  res.end('write ok')
})

app.get('/read', (req, res) => {
  console.log(req.cookies)
  res.end(req.cookie('name', { signed: true })) // name=hamling
})

app.listen(3000, () => {
  console.log('server running at port 3000')
})
