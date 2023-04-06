const express = require('express')
const querystring = require('querystring')

const app = express() // express本质上是创建了server的实例（http.createServer)

app.get('/', (req, res) => {
  res.end('home: hello express')
})

app.get('/about', (req, res) => {
  console.log('req.host', req.host)
  console.log('req.path', req.path)
  console.log('req.query', req.query)
  res.end('about: about me')
})

// 动态路由
app.get('/users/:id/:name', (req, res) => {
  console.log(req.params)
  res.end(JSON.stringify(req.params))
})

// app.get('/users', (req, res) => {
//   console.log('req.headers', req.headers)
//   res.end('users: hamling')
// })

// bodyParser
// app.post('/users', (req, res) => {
//   const buffers = []
//   req.on('data', data => {
//     buffers.push(data)
//   })
//   req.on('end', () => {
//     let body = Buffer.concat(buffers).toString()
//     req.body = body = JSON.stringify(querystring.parse(body))
//     console.log(req.body)
//   })
//   res.end('hello post\n')
// })

// all方法可以匹配所有动词 get/post
// app.all('/users', (req, res) => {
//   res.end('hello all\n')
// })

app.all('*', (req, res) => {
  res.statusCode = 404
  res.end('404 Not Found')
})

app.listen(3000, err => {
  if (!err) console.log('server running at http://localhost:3000')
})

// 指定请求头
// curl -h "content-type: application/json;charset=utf-8" http://localhost:3000/users
// 指定方法名
// curl -X POST http://localhost:3000/users
// 指定请求体
// curl --data "name=hamling&age=30" http://localhost:3000/users
