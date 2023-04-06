const http = require('http')
const url = require('url')

function Application () {
  this._router = [{
    path: '*', method: 'get', handler(req, res) {
      res.end(`Cannot ${req.method} ${req.url}`)
    }
  }]
}

Application.prototype.get = function (path, handler) {
  this._router.push({ path, method: 'get', handler })
}

Application.prototype.listen = function () {
  const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url)
    const requestMethod = req.method.toLowerCase()
    for (let i = 1; i < this._router.length; i++) {
      const { path, method, handler } = this._router[i]
      if (pathname === path && requestMethod === method) {
        return handler(req, res)
      }
    }
    return this._router[0].handler(req, res)
  })
  server.listen.apply(server, arguments)
}

module.exports = Application
