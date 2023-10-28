const express = require('express')

const app = express()

app.get('/jsonp', (req, res) => {
  const { name, jsonp } = req.query
  const str = (name || '') + ' hello world'
  res.end(`${jsonp}('${str}')`)
})

app.listen(3000)
