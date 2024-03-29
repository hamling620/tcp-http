const http = require('http')
const methods = require('methods')
const Router = require('./router')
const init = require('./middleware/init')

function Application () {}

Application.prototype.lazy_route = function () {
  if (!this.router) {
    this.router = new Router()
    this.use(init())
  }
}

methods.forEach(method => {
  Application.prototype[method] = function (path, ...handlers) {
    this.lazy_route()
    this.router[method](path, handlers)
  }
})

Application.prototype.use = function (...args) {
  this.lazy_route()
  this.router.use(...args)
}
Application.prototype.param = function (...args) {
  this.lazy_route()
  this.router.param(...args)
}

Application.prototype.listen = function (...args) {
  this.lazy_route()
  function done(req, res) {
    res.end(`Cannot ${req.method} ${req.url}`)
  }
  const server = http.createServer((req, res) => {
    this.router.handle(req, res, done)
  })
  server.listen(...args)
}

module.exports = Application
