const express = require('./express')

const app = express()

app.get('/hello', (req, res) => {
  res.end('hello')
})

app.get('/world', function (req, res) {
  res.end('world')
})

// app.all('*', (req, res) => {
//   res.end('404 Not found')
// })

app.listen(3000, err => {
  if (!err) console.log('server running at http://localhost:3000')
})
