const url = require('url')
const Route = require('./route')
const Layer = require('./layer')

function Router () {
  this.stack = []
}
Router.prototype.route = function (path) {
  const route = new Route()
  const layer = new Layer(path, route.dispatch.bind(route))
  layer.route = route
  this.stack.push(layer)
  return route
}

Router.prototype.get = function (path, handlers) {
  const route = this.route(path)
  route.get(handlers)
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
