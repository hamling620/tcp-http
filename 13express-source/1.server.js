const express = require('./express1')

const app = express()

app.get('/', (req, res) => {
  res.end('home')
})

app.get('/user', (req, res) => {
  res.end('user')
})

app.listen(3000, () => {
  console.log('server running at port 3000')
}) 