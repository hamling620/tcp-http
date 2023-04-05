const http = require('http')

const server = http.createServer((req, res) => {
  // 设置响应码
  // res.statusCode = 200
  res.statusCode = 404

  // Date响应头会默认设置，设置为false就不会设置了
  res.sendDate = false

  // 设置和删除请求头
  // res.setHeader('content-type', 'text/html;charset=utf8')
  // console.log('getHeader1', res.getHeader('Content-Type'))
  // res.removeHeader('content-type')
  // console.log('getHeader2', res.getHeader('Content-Type'))

  res.setHeader('content-type', 'text/html')
  console.log('headersSent1', res.headersSent)
  res.writeHead(200, { 'content-type': 'text/html;charset=utf8'})
  console.log('headersSent2', res.headersSent)
  // 只有在调用writeHead或者write方法后,才会把响应头发送给客户端

  // 响应数据
  res.write('hello ')
  res.write('world')
  res.end()
})

server.listen(3000, err => {
  if (!err) console.log('server running at http://localhost:3000')
})

// HTTP源码等TCP学完之后再看一看....
