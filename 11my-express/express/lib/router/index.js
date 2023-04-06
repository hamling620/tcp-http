const url = require('url')

function Router () {
  this.stack = []
}

Router.prototype.get = function (path, handler) {
  this.stack.push({
    path,
    method: 'get',
    handler
  })
}

Router.prototype.handle = function (req, res, out) {
  const { pathname } = url.parse(req.url)
  const requestMethod = req.method.toLowerCase()

  for (let i = 0; i < this.stack.length; i++) {
    const { path, method, handler } = this.stack[i]
    if (pathname === path && requestMethod === method) {
      return handler(req, res)
    }
  }
  out()
}

module.exports = Router
