const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')
const zlib = require('zlib')
const mime = require('mime')
const { promisify } = require('util')

const server = http.createServer(async (req, res) => {
  // 获取请求路径，然后拼接服务器内文件路径
  const { pathname } = url.parse(req.url)
  const filePath = path.join(__dirname, pathname)

  if (pathname === '/') {
    return res.end('hello world')
  }

  try {
    // 获取文件
    const statsObj = await promisify(fs.stat)(filePath)
    res.setHeader('Content-Type', mime.getType(pathname))

    // accept-开头的头部表示内容协商
    const acceptEncoding = req.headers['accept-encoding'] 
    if (acceptEncoding) {
      if (acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip')
        fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(res)
        return
      } else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate')
        fs.createReadStream(filePath).pipe(zlib.createDeflate()).pipe(res)
        return
      } 
    }
    fs.createReadStream(filePath).pipe(res)

  } catch (err) {
    console.log('err', err)
    res.statusCode = 404
    res.end('404 Not Found')
  }
})

server.listen(3000, (err) => {
  if (!err) {
    console.log('server running at http://localhost:3000')
  }
})
