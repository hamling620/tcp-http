const express = require('./express')
const path = require('path')

const app = express()

app.get('/', (req, res) => {
  console.log(req.path)
  console.log(req.query)
  res.sendFile(path.resolve(__dirname, './user.js'))
})

app.listen(3000)
