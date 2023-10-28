const express = require('express')
// const cors = require('cors')

const app = express()
// app.use(cors())

app.use((req, res, next) => {
  console.log(req.headers)
  // 简单请求设置响应头 Acess-Control-Allow-Origin
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  // 允许的headers 包括自定义请求头
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Token')
  // 设置这个响应头，允许客户端通过xhr.getResponseHeader()获取响应头
  res.setHeader('Access-Control-Expose-Headers', 'X-Token')
  // 允许的方法
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST')
  // 允许用户携带Cookie
  res.setHeader('Access-Control-Allow-Credentials', true)
  // 设置preflight请求的缓存时间，预检请求一旦发送，用来检测服务器是否接受真正的请求，这个值以秒为单位，代表预检请求结果可以缓存的时间，在这个时间段内，浏览器无需发送preflight请求
  res.setHeader('Acess-Control-Allow-Max-Age', 60)

  // 直接响应OPTIONS请求
  if (req.method.toLowerCase() === 'options') {
    return res.sendStatus(200)
  }
  next()
})

app.get('/users', (req, res) => {
  const users = [
    { id: '111', name: 'hamling', age: 18 },
    { id: '222', name: 'lucile', age: 33 },
    { id: '333', name: 'michael', age: 28 }
  ]
  res.json({
    code: 0,
    data: users
  })
})

app.post('/users', (req, res) => {
  // 设置自定义响应头
  res.setHeader('X-Token', 'abcdefg')
  const users = [
    { id: '111', name: 'hamling', age: 18 },
    { id: '222', name: 'lucile', age: 33 },
    { id: '333', name: 'michael', age: 28 }
  ]
  res.json({
    code: 0,
    data: users
  })
})

app.listen(3000)
