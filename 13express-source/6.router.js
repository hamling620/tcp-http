const express = require('express')
const userRouter = require('./user')

const app = express()

app.get('/', (req, res) => {
  res.end('/')
})
app.use('/user', userRouter)

app.listen(3000)
