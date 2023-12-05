const methods = require('methods')
const url = require('url')
const Route = require('./route')
const Layer = require('./layer')

function Router () {
  this.stack = []
}

Router.prototype.use = function (path, ...handlers) {
  // 如果默认没有传递path，那么将它设为/
  if (typeof path !== 'string') {
    handlers.unshift(path) // path加入到handlers的前面
    path = '/'
  }
  // use方法直接在路由的stack中添加一个layer
  handlers.forEach(handler => {
    this.stack.push(new Layer(path, handler))
  })
}

methods.forEach(method => {
  // router的stack存入layer，layer中有path和dispatch 还有一个对应的route，route中对应handlers
  // route中又存入了layer
  Router.prototype[method] = function (path, handlers) {
    // 创建一个Route
    const route = new Route()
    route[method](handlers) // route里面有一个stack，也要存储layer

    // 创建一个Layer
    const layer = new Layer(path, route.dispatch.bind(route)) // 执行route中的handlers
    layer.route = route
    this.stack.push(layer)
  }
})

Router.prototype.handle = function (req, res, out) {
  const { pathname } = url.parse(req.url)
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
      if (layer.match(pathname)) {
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
