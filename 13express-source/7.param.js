const express = require('./express')

const app = express()

app.param('username', (req, res, next, value, key) => {
  if (value == 1) {
    req.params.username *= 2
  }
  next()
})

app.param('username', (req, res, next, value, key) => {
  if (req.params.username == 2) {
    req.params.username += 10
  }
  next()
})

app.get('/user/:username/:password', (req, res) => {
  const { username, password } = req.params
  res.end(`${username}:${password}`)
})

app.listen(3000)
