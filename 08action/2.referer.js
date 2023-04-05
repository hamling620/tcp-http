const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

const server = http.createServer(handleRequest)

function handleRequest(req, res) {
  const { hostname } = url.parse(req.url)
  const whiteList = [
    'localhost',
    '127.0.0.1'
  ]
  const refer = req.headers['referer'] || req.headers['refer']
  console.log(refer)
  if (refer) {
    const referHostname = url.parse(refer).hostname
    console.log(referHostname)
    if (referHostname !== hostname && !whiteList.includes(referHostname)) {
      res.statusCode = 403
      return res.end()
    }
  }
  res.setHeader('Content-Type', 'image/jpeg')
  fs.createReadStream('./girl.jpeg').pipe(res)
}

server.listen(4000, err => {
  if (!err) {
    console.log('server running at http://localhost:4000')
  }
})
