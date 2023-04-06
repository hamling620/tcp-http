// 中间件的原理

const app = function (req, res) {
  let i = 0 // 每次执行后+1
  function next () {
    const fn = app.routes[i++]
    if (fn) fn(req, res, next)
  }
  next()
}

app.routes = []
app.use = function (fn) {
  app.routes.push(fn)
}

app.use((req, res, next) => {
  console.log(1, req.url)
  next()
})

app.use((req, res, next) => {
  console.log(2)
  res.end('ok')
  next()
})

const server = require('http').createServer(app)
server.listen(3000)
