const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const util = require('util')
const mime = require('mime')
const crypto = require('crypto')

const server = http.createServer(async (req, res) => {
  const { pathname } = url.parse(req.url)
  const filePath = path.join(__dirname, pathname)
  try {
    const stats = await util.promisify(fs.stat)(filePath)
    if (stats.isDirectory()) return res.end()
    const ifNoneMatch = req.headers['if-none-match']
    const md5 = crypto.createHash('md5')
    const rs = fs.createReadStream(filePath)
    rs.on('data', data => {
      md5.update(data)
    })
    rs.on('end', () => {
      const etag = md5.digest('hex')
      if (ifNoneMatch === etag) {
        res.statusCode = 304
        res.end()
      } else {
        res.setHeader('Etag', etag)
        res.setHeader('Content-Type', mime.getType(filePath))
        fs.createReadStream(filePath).pipe(res)
      }
    })
  } catch (e) {
    console.log(e)
    res.statusCode = 404
    res.end('404 Not Found')
  }
})

server.listen(3000, err => {
  if (!err) {
    console.log('server running at http://localhost:3000')
  }
})