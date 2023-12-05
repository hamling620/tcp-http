
function Layer(path, handler) {
  this.path = path
  this.handler = handler
}

Layer.prototype.match = function (pathname) {
  if (this.path === pathname) return true
  // 通过use中间件逻辑的没有route属性
  if (!this.route) {
    if (this.path === '/') return true // 不填，默认都会命中
    return pathname.startsWith(this.path + '/')
  }
  return false
}

Layer.prototype.handle_request = function (req, res, next) {
  this.handler(req, res, next)
}

Layer.prototype.handle_error = function (err, req, res, next) {
  this.handler(err, req, res, next)
}

module.exports = Layer
