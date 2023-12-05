const url = require('url')
const methods = require('methods')
const Layer = require('./layer')
const Route = require('./route')

function Router () {
  const router = function (req, res, next) {
    router.handle(req, res, next)
  }
  router.stack = []
  router.paramCallbacks = {}
  router.__proto__ = proto
  return router
}

const proto = {}

methods.forEach(method => {
  proto[method] = function (path, handlers) {
    const route = new Route()
    route[method](handlers)

    const layer = new Layer(path, route.dispatch.bind(route))
    layer.route = route
    this.stack.push(layer)
  }
})

proto.use = function (path, ...handlers) {
  if (typeof path !== 'string') {
    handlers.unshift(path)
    path = '/'
  }
  handlers.forEach(handler => {
    this.stack.push(new Layer(path, handler))
  })
}

proto.param = function (key, callback) {
  const callbacks = this.paramCallbacks[key] || []
  callbacks.push(callback)
  this.paramCallbacks[key] = callbacks
}

proto.handle_params = function (req, res, layer, callback) {
  const paramCallbacks = this.paramCallbacks
  const keys = layer.keys.map(item => item.name)
  if (!keys.length) {
    return callback()
  }
  let idx = 0
  let key, fns
  const next = () => {
    if (keys.length === idx) return callback()
    key = keys[idx++]
    fns = paramCallbacks[key]
    if (fns && fns.length) {
      processCallback()
    } else {
      next()
    }
  }
  let i = 0
  const processCallback = () => {
    let fn = fns[i++]
    if (fn) {
      fn(req, res, processCallback, layer.params[key], key)
    } else {
      i = 0
      next()
    }
  }
  next()
}

proto.handle = function (req, res, out) {
  const { pathname: requestPath } = url.parse(req.url)
  const requestMethod = req.method.toLowerCase()

  let idx = 0
  let removed = ''
  const next = (err) => {
    if (idx === this.stack.length) return out(req, res)
    const layer = this.stack[idx++]
    if (removed) {
      req.url = removed + req.url
      removed = ''
    }

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
            // use router
            // 进入中间件时，需要去除中间件的path
            removed = layer.path === '/' ? '' : layer.path
            req.url = req.url.slice(removed.length)
            layer.handle_request(req, res, next)
          }
        } else {
          if (layer.route.methods[requestMethod]) {
            req.params = layer.params
            this.handle_params(req, res, layer, () => {
              layer.handle_request(req, res, next)
            })
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
