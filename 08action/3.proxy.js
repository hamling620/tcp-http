const http = require('http')
const httpProxy = require('http-proxy')

const proxy = httpProxy.createProxyServer()
const server = http.createServer((req, res) => {
  proxy.web(req, res, {
    target: 'http://localhost:3000'
  })
  proxy.on('error', err => {
    console.log('代理出错了')
    res.end(err.toString())
  })
})

server.listen(8080)

// 正向代理
// 从内（局域网内）向外访问，经过内部的代理服务器
