const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')
const util = require('util')
const zlib = require('zlib')
const crypto = require('crypto')

const chalk = require('chalk')
const mime = require('mime')
const handlebars = require('handlebars')

const config = require('./config')

// 定义环境变量
process.env.DEBUG = 'static:*'
const debug = require('debug')('static:app')

const stat = util.promisify(fs.stat)
const readdir = util.promisify(fs.readdir)

// 模板
function list () {
  const template = fs.readFileSync(path.join(__dirname, 'template/list.html'), 'utf8')
  return handlebars.compile(template)
}

class Server {
  constructor (options) {
    this.list = list()
    this.config = Object.assign({}, config, options)
  }
  start () {
    const server = http.createServer()
    server.on('request', this.request)
    server.listen(this.config.port, err => {
      if (!err) {
        const url = `http://${this.config.host}:${this.config.port}`
        debug(`Server started at ${chalk.green(url)}`)
      }
    })
  }
  request = async (req, res) => {
    try {
      const { pathname } = url.parse(req.url)
      if (pathname === '/favicon.ico') {
        res.statusCode = 404
        return res.end('404 not found')
      }
      const filePath = path.join(this.config.root, pathname)
      const statObj = await stat(filePath)
      if (statObj.isDirectory()) {
        this.sendDirectory(req, res, filePath, pathname)
      } else {
        this.sendFile(req, res, filePath, statObj)
      }
    } catch (e) {
      debug(util.inspect(e))
      this.sendError(req, res)
    }
  }

  async sendDirectory (req, res, filePath, pathname) {
    let files = await readdir(filePath)
    files = files.map(file => ({
      name: file,
      url: path.join(pathname, file)
    }))
    const html = this.list({
      title: pathname,
      files
    })
    res.setHeader('Content-Type', 'text/html')
    res.end(html)
  }

  sendFile (req, res, filePath, statObj) {
    const isCached = this.handleCache(req, res, filePath, statObj)
    if (isCached) {
      res.statusCode = 304
      return res.end()
    }
    res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8')
    const encoding = this.getEncoding(req, res, filePath, statObj)
    if (encoding) {
      fs.createReadStream(filePath).pipe(encoding).pipe(res)
    } else {
      fs.createReadStream(filePath).pipe(res)
    }
  }
  // 缓存
  handleCache (req, res, filePath, statObj) {
    // 先走强制缓存
    res.setHeader('Expires', new Date(Date.now() + 300 * 1000).toGMTString())
    res.setHeader('Cache-Control', 'private, max-age=300')

    // 协商缓存
    const ifNoneMatch = req.headers['if-none-match']
    const ifModifiedSince = req.headers['if-modified-since']
    const etag = crypto.createHash('md5').update(statObj.ctime.toGMTString() + statObj.size).digest('hex')
    const lastModified = statObj.ctime.toGMTString()

    // 存在问题
    // if (ifNoneMatch && ifNoneMatch !== etag) return false
    // if (ifModifiedSince && ifModifiedSince !== lastModified) return false
    // if (!ifNoneMatch) {

    // }
    // if (!ifModifiedSince) {

    // }
    res.setHeader('ETag', etag)
    res.setHeader('Last-Modified', lastModified)
    return ifNoneMatch || ifModifiedSince
  }

  // 压缩
  getEncoding (req, res, filePath, statObj) {
    const encoding = req.headers['accept-encoding']
    if (/\bgzip\b/.test(encoding)) {
      res.setHeader('Content-Encoding', 'gzip')
      return zlib.createGzip()
    } else if (/\bdeflate\b/.test(encoding)) {
      res.setHeader('Contnt-Encoding', 'deflate')
      return zlib.createDeflate()
    } 
    return null
  }

  sendError (err, req, res) {
    debug(err.toString())
    res.statusCode = 500
    res.end('there is something wrong in the server')
  }
}

module.exports = Server
