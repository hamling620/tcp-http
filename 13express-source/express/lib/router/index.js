const url = require('url')
const methods = require('methods')
const Layer = require('./layer')
const Route = require('./route')

function Router () {
  this.stack = []
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

Router.prototype.use = function (path, ...handlers) {
  if (typeof path !== 'string') {
    handlers.unshift(path)
    path = '/'
  }
  handlers.forEach(handler => {
    this.stack.push(new Layer(path, handler))
  })
}

Router.prototype.handle = function (req, res, out) {
  const { pathname: requestPath } = url.parse(req.url)
  const requestMethod = req.method.toLowerCase()

  let idx = 0
  const next = (err) => {
    if (idx === this.stack.length) return out(req, res)
    const layer = this.stack[idx++]
    if (err) {
      if (!layer.route) {
        if (layer.handler.length === 4) {
          layer.handler_error(err, req, res, next)
        } else {
          next(err)
        }
      } else {
        next(err)
      }
    } else {
      if (layer.match(requestPath)) {
        if (!layer.route) {
          if (layer.handler.length === 4) {
            next()
          } else {
            layer.handle_request(req, res, next)
          }
        } else {
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
  }
  next()
}

module.exports = Router
