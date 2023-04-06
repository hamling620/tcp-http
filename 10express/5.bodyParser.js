const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

// 直接使用post定义路径
app.post('/', (req, res) => {
  console.log(req.body) // bodyParser中间件将请求体转为json放到req.body上
  res.redirect(302, '/about') // redirect表示重定向
})

app.get('/about', (req, res) => {
  res.end('about')
})

app.listen(3000, err => {
  if (!err) console.log('http://localhost:3000')
})