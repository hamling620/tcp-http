const express = require('./express')

const app = express()

app.get('/user/:username/:password', (req, res) => {
  res.end(JSON.stringify(req.params))
})

app.listen(3000)
