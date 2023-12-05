const express = require('./express1')

const app = express()

app.get('/user', (req, res, next) => {
  console.log('login validate')
  next()
}, (req, res, next) => {
  console.log('auth validate')
  next()
}, (req, res, next) => {
  req.user = 100
  next()
})

app.get('/user', (req, res) => {
  req.user += 100
  console.log('req.user', req.user)
  res.end('user')
})

app.post('/user', (req, res) => {
  res.end('post user')
})

app.listen(3000, () => {
  console.log('server running at port 3000')
}) 

console.dir(app.router, { depth: 10 })

