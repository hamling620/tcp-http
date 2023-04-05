// 浏览器默认会将文件缓存到Cache目录，第二次请求时，浏览器会检查Cache目录下是否有该文件，如果有，并且还没到Expires设置的时间，也就是说缓存还没有过期，那么此时浏览器将从Cache目录中读取文件，而不再发送请求
// Expires是服务器响应消息头字段，在响应http请求时告诉浏览器在过期的时间前，浏览器可以从浏览器缓存中读取文件，而无需再次请求，这是HTTP1.0的内容，现在浏览器默认使用HTTP1.1，所以基本可以忽略
// Cache-Control字段与Expires一致，都是指明当前字段的有效期，控制浏览器是否直接从浏览器缓存中读取数据，如果同时设置的话，其优先级高于Expires

// private 客户端可以缓存
// public 客户端和代理服务器都可以缓存
// max-age=60 缓存内容将在60s后消失
// no-cache 需要使用对比缓存验证数据，强制向源服务器发送验证
// no-store 所有内容都不缓存，强制缓存和对比缓存都不触发

// Cache-Control: private, max-age=60, no-cache

const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const util = require('util')
const mime = require('mime')

const server = http.createServer(async (req, res) => {
  try {
    const { pathname } = url.parse(req.url)
    const filePath = path.join(__dirname, pathname)
    console.log(filePath)

    const stats = await util.promisify(fs.stat)(filePath)
    if (stats.isDirectory()) return res.end()
    const expires = new Date(Date.now() + 30 * 1000)
    res.setHeader('Expires', expires.toGMTString())
    res.setHeader('Cache-Control', 'max-age=30')
    res.writeHead(200, { 'Content-Type': mime.getType(filePath) })
    fs.createReadStream(filePath).pipe(res)
  } catch (e) {
    res.statucCode = 404
    res.end('404 not Found')
  }
})

server.listen(3000, err => {
  if (!err) {
    console.log('server running at http://localhost:3000')
  }
})
