// const express = require('./express1')
const express = require('express')

const app = express()

app.get('/', (req, res, next) => {
  console.log(1)
  // res.end('home')
  next()
}, (req, res, next) => {
  console.log(2)
  // res.end('home')
  next()
})

// 如果不调用next方法，只会匹配一个，而且只能执行一次res.end()
app.get('/', (req, res) => {
  console.log(2)
  res.end('hello')
})

app.post('/', (req, res) => {
  res.end('home')
})

app.get('/user', (req, res) => {
  res.end('user')
})

app.listen(3000, () => {
  console.log('server running at port 3000')
})

// console.log('app.router', app.router)
