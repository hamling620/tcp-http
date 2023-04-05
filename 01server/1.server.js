// http服务器是继承自tcp服务器的，HTTP是应用层协议，基于TCP传输层协议
// http对请求和响应做了包装
// req是可读流
// res是可写流

const http = require('http')
const url = require('url')

const server = http.createServer()
/* (req, res) => {
  console.log(req, res)
  res.end('hello world')
}*/
// 建立连接，request在connection中执行
server.on('connection', socket => {
  console.log('客户端连接')
})

server.on('request', (req, res) => {
  console.log(req.method)
  console.log(req.url)
  // console.log(req.protocal)
  console.log(req.headers)
  const { pathname, query } = url.parse(req.url, true)
  console.log(pathname, JSON.stringify(query))
  if (req.method === 'POST') {
    let buffer = []
    req.on('data', chunk => {
      buffer.push(chunk)
    })
    req.on('end', () => {
      let result = Buffer.concat(buffer)
      res.end(result.toString())
    })
  }
})

server.on('close', () => {
  console.log('服务器关闭')
})

server.on('error', err => {
  console.log('服务器错误', err)
})

// 注意，服务器拿不到hash值

server.listen(3000, err => {
  if (!err) console.log('server is running at http://localhost:3000')
})
