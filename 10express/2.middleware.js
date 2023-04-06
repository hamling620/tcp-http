const express = require('express')

const app = express()

// app.use((req, res, next) => {
//   res.setHeader('Content-Type', 'text/plain;charset=utf-8')
//   next()
// })

app.use((req, res, next) => {
  console.log('method', req.method, 'path', req.path)
  next()
})

app.get('/', (req, res) => {
  res.end('首页')
})

app.get('/about', (req, res) => {
  // res.send('hello about') 第一次请求会设置响应头为Content-Type: text/html
  // res.send({ name: 'hamling' }) 第一次请求会设置响应头为Content-Type: application/json;charset=utf-8
  // res.sendStatus(200) // send和sendStatus是互斥的，只能调用一次，相当于end
  res.send('hello')
})

app.listen(4000, err => {
  if (!err) console.log('server running at http://localhost:4000')
})

// 中间件就是处理HTTP请求的函数，用来完成各种特定的任务：检查用户是否登录，检查用户是否有权限登录等。它的特点是：
// 一个中间件处理完请求和响应，可以把数据传递给下一个中间件；
// 回调函数next的参数，表示接受其它中间件的调用，函数体中的next()，就表示将请求数据传递个另一个中间件；
// 还可以根据路径来区分进行返回不同的中间件

