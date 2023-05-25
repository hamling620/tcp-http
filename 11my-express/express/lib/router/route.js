const Layer = require('./layer')

function Route () {
  this.stack = []
}

Route.prototype.dispatch = function () {

}

Route.prototype.get = function (handlers) {
  handlers.forEach(handler => {
    const layer = new Layer('/', handler)
    layer.method = 'get'
    this.stack.push(layer)
  })
}

module.exports = Route
