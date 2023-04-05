const http = require('http')
const httpProxy = require('http-proxy')

const proxy = httpProxy.createProxyServer()

const hosts = {
  'lucile.com': 'http://localhost:8000',
  'hamling.com': 'http://localhost:9000'
}

const server = http.createServer((req, res) => {
  let host = req.headers.host
  host = host.split(':')[0]
  const target = hosts[host]
  proxy.web(req, res, {
    target
  })
})

server.listen(80)

// 虚拟主机
// 反向代理
// 从外向内请求一个服务器，这个服务器再从内部服务器请求并返回
// webpack proxy 、nginx


