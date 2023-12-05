const express = require('./express')

const app = express()

app.use('/', (req, res, next) => {
  console.log(1)
  // next('error111')
  next()
}, (req, res, next) => {
  console.log(2)
  next('error222')
})

app.use('/user', (req, res, next) => {
  console.log(3)
  next('error---')
})

app.get('/user', (req, res) => {
  res.end('user')
})

app.use((err, req, res, next) => {
  res.end(err + 'my')
})

app.listen(3000, () => {
  console.log('server running at port 3000')
}) 
