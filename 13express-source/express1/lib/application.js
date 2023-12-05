const http = require('http')
const methods = require('methods')
const Router = require('./router')

function Application () {}

// 路由懒加载
Application.prototype.lazy_route = function () {
  if (!this.router) {
    this.router = new Router()
  }
}

// use
Application.prototype.use = function (...args) {
  this.lazy_route()
  this.router.use(...args)
}

// get/post/put/delete等
methods.forEach(method => {
  Application.prototype[method] = function (path, ...handlers) {
    this.lazy_route()
    this.router[method](path, handlers)
  }
})

// listen
Application.prototype.listen = function (...args) {
  this.lazy_route()
  function done(req, res) {
    console.log(`Cannot ${req.method} ${req.url}`)
  }
  const server = http.createServer((req, res) => {
    this.router.handle(req, res, done)
  })
  server.listen(...args)
}

module.exports = Application
