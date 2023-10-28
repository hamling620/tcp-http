const url = require('url')
const methods = require('methods')
const Layer = require('./layer')
const Route = require('./route')

function Router () {
  this.stack = []
}

Router.prototype.use = function (path, ...handlers) {
  if (typeof path !== 'string') {
    handlers.unshift(path)
    path = '/'
  }
  handlers.forEach(handler => {
    this.stack.push(new Layer(path, handler))
  })
}

methods.forEach(method => {
  Router.prototype[method] = function (path, handlers) {
    const route = new Route()
    route[method](handlers)
    const layer = new Layer(path, route.dispatch.bind(route))
    layer.route = route
    this.stack.push(layer)
  }
})

Router.prototype.handle = function (req, res, out) {
  const { pathname: requestPath } = url.parse(req.url)
  const requestMethod = req.method.toLowerCase()

  let idx = 0
  const next = () => {
    if (idx === this.stack.length) return out(req, res)
    const layer = this.stack[idx++]
    // 匹配路径
    if (layer.match(requestPath)) {
      if (!layer.route) { // middleware
        layer.handle_request(req, res, next)
      } else { // route
        if (layer.route.methods[requestMethod]) {
          layer.handle_request(req, res, next)
        } else {
          next()
        }
      }
    } else {
      next()
    }
  }
  next()
}

module.exports = Router
