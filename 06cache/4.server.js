const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const util = require('util')
const crypto = require('crypto')
const mime = require('mime')

const server = http.createServer(async (req, res) => {
  try {
    const { pathname } = url.parse(req.url, true)
    const filePath = path.join(__dirname, pathname)

    console.log(filePath)

    const statObj = await util.promisify(fs.stat)(filePath)
    if (statObj.isDirectory()) {
      return res.end()
    }

    // 设置强制缓存 状态码200
    // res.setHeader('Cache-Control', 'no-store') 不走缓存，强制缓存和协商缓存都不触发
    // res.setHeader('Cache-Control', 'no-cache') // 强制走协商缓存
    res.setHeader('Expires', new Date(Date.now() + 30 * 1000).toGMTString())
    res.setHeader('Cache-Control', 'private,max-age=30') // 强制缓存30s，30s内不请求服务器，private表示客户端可以进行缓存，public表示客户端和代理服务器都能进行缓存
    // const ifModifiedSince = req.headers['if-modified-since']
    const ifNoneMatch = req.headers['if-none-match']
    // 上次修改时间和文件大小生成的指纹
    const etag = crypto.createHash('md5').update(`${statObj.ctime.toGMTString() + statObj.size}`).digest('hex')
    // const lastModified = statObj.ctime.toGMTString()

    res.setHeader('Etag', etag)
    // res.setHeader('Last-Modified', lastModified)

    // 如果命中缓存直接返回304，告诉客户端使用缓存
    if (ifNoneMatch && ifNoneMatch === etag) {
      res.statusCode = 304
      return res.end()
    }

    // 直接返回
    // 设置响应头Content-Type、LastModified
    const contentType = mime.getType(filePath)
    res.setHeader('Content-Type', contentType)
    fs.createReadStream(filePath).pipe(res)
  } catch (e) {
    console.log('error', e)
    res.statusCode = 404
    res.end('404 Not Found')
  }

})

server.listen(3000, () => {
  console.log('server runninig at http://localhost:3000')
})