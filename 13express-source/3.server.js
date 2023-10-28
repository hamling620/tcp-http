const express = require('./express1')

const app = express()

app.use('/', (req, res, next) => {
  console.log(1)
  next()
}, (req, res, next) => {
  console.log(2)
  next()
})

app.use('/user', (req, res, next) => {
  console.log(3)
  next()
})

app.get('/user', (req, res) => {
  res.end('user')
})

app.listen(3000, () => {
  console.log('server running at port 3000')
}) 
