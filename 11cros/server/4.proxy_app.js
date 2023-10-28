const express = require('express')

const app = express()

app.get('/users', (req, res) => {
  res.json({
    code: 0,
    data: 'hello'
  })
})

app.listen(3000)
