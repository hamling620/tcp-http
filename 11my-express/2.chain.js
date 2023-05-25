const express = require('./express')

const app = express()

app.get('/hello', (req, res) => {
  res.end('hello')
}, (req, res) => {
  console.log('hello')
})

app.get('/world', function (req, res) {
  res.end('world')
})

app.listen(3000, err => {
  if (!err) console.log('server running at http://localhost:3000')
})
