const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const util = require('util')
const mime = require('mime')

const server = http.createServer(
  async (req, res) => {
    try {
      const { pathname } = url.parse(req.url)
      const filePath = path.join(__dirname, pathname)
      const stats = await util.promisify(fs.stat)(filePath)
      if (stats.isDirectory()) return res.end()
      const ifModifiedSince = req.headers['if-modified-since']
      const lastModified = stats.ctime.toGMTString()
      if (ifModifiedSince === lastModified) {
        res.statusCode = 302
        res.end()
      } else {
        res.setHeader('Content-Type', mime.getType(filePath))
        res.setHeader('Last-Modified', lastModified)
        fs.createReadStream(filePath).pipe(res)
      }
    } catch (e) {
      console.log(e)
      res.statusCode = 404
      res.end('404 Not Found')
    }
  }
)

server.listen(3000, err => {
  if (!err) console.log('server started at http://localhost:3000')
})
// 某些服务器不能精确得到文件的最后修改时间，这样就无法通过最后时间来判断用户更新了
// 某些文件修改非常频繁，在秒以下的时间进行修改，last-modified只能精确到秒
// 一些文件的最后修改时间改了，但是内容并未改变，我们不希望客户认为这个文件修改了
// 如果一个文件处于多个CDN服务器之下，服务器上的内容虽然相同，但是最后修改时间不同
