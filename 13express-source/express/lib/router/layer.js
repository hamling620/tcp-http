const pathToRegexp = require('path-to-regexp')

function Layer (path, handler) {
  this.path = path
  this.handler = handler
  this.regexp = pathToRegexp(path, (this.keys = []), { strict: true })
}

Layer.prototype.match = function (pathname) {
  if (this.path === pathname) return true
  const matched = pathname.match(this.regexp)
  if (matched) {
    this.params = this.keys.reduce((memo, curr, index) => {
      memo[curr.name] = matched[index + 1]
      return memo
    }, {})
    return true
  }
  if (!this.route) {
    if (this.path === '/') return true
    return pathname.startsWith(this.path + '/')
  }
  return false
}

Layer.prototype.handle_request = function (req, res, next) {
  this.handler(req, res, next)
}

Layer.prototype.handler_error = function (err, req, res, next) {
  this.handler(err, req, res, next)
}

module.exports = Layer
