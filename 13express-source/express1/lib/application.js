const http = require('http')
const methods = require('methods')
const Router = require('./router')

function Application () {}

Application.prototype.lazy_router = function () {
  if (!this.router) {
    this.router = new Router()
  }
}

Application.prototype.use = function (...args) {
  this.lazy_router()
  this.router.use(...args)
}

methods.forEach(method => {
  Application.prototype[method] = function (path, ...handlers) {
    this.lazy_router()
    this.router[method](path, handlers)
  }
})

Application.prototype.listen = function (...args) {
  this.lazy_router()
  function done (req, res) {
    res.end(`Cannot ${req.method} ${req.url}`)
  }

  const server = http.createServer((req, res) => {
    this.router.handle(req, res, done)
  })
  server.listen(...args)
}

module.exports = Application
