const http = require('http')
const Router = require('./router')

function Application () {
  this._router = new Router()
}

Application.prototype.get = function (path, ...handlers) {
  this._router.get(path, handlers)
}

Application.prototype.listen = function () {
  const server = http.createServer((req, res) => {
    function done () {
      res.end(`Cannot ${req.method} ${req.url}`)
    }
    this._router.handle(req, res, done)
  })
  server.listen.apply(server, arguments)
}

module.exports = Application
