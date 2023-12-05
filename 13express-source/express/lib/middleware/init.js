const url = require('url')
const fs = require('fs')

function init() {
  return function (req, res, next) {
    const { pathname, query } = url.parse(req.url, true)
    req.path = pathname
    req.query = query
    res.send = function (data) {
      if (typeof data === 'string' || Buffer.isBuffer(data)) {
        res.setHeader('Content-Type', 'text/plain')
        res.end(data)
      }
    }
    res.json = function (data) {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(data))
    }
    res.sendFile = function (url) {
      fs.createReadStream(url).pipe(res)
    }
    next()
  }
}

module.exports = init
