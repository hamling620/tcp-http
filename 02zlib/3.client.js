const http = require('http')
const zlib = require('zlib')
const fs = require('fs')

const response = http.get({
  host: 'localhost',
  path: '/msg.txt',
  port: 3000,
  headers: {
    'accept-encoding': 'gzib,deflate'
  }
})

response.on('response', (res) => { // res本身就是一个可写流，req是可读流
  const output = fs.createWriteStream('text.txt')
  const contentEncoding = res.headers['content-encoding']
  switch (contentEncoding) {
    case 'gzip':
      res.pipe(zlib.createGunzip()).pipe(output)
      break
    case 'deflate':
      res.pipe(zlib.createInflate()).pipe(output)
      break
    default:
      res.pipe(output)
      break
  }
})

response.end()
