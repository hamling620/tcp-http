const methods = require('methods')
const Layer = require('./layer')

function Route () {
  this.stack = []
  this.methods = {}
}

methods.forEach(method => {
  Route.prototype[method] = function (handlers) {
    // 根据handlers创建新的层
    handlers.forEach(handler => {
      const layer = new Layer('', handler)
      layer.method = method
      this.methods[method] = true
      this.stack.push(layer)
    })
  }
})

Route.prototype.dispatch = function (req, res, out) {
  let idx = 0
  const next = (err) => {
    if (err) return out(err)
    if (idx === this.stack.length) return out()
    const layer = this.stack[idx++]
    const requestMethod = req.method.toLowerCase()
    if (layer.method === requestMethod) {
      layer.handle_request(req, res, next)
    } else {
      next()
    }
  }
  next()
}

module.exports = Route
