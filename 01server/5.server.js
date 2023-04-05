const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  console.log(req.url)
  console.log(req.method)
  // 不发送日期Date Header
  res.sendDate = false
  if (req.method === 'POST') {
    const buffers = []
    req.on('data', chunk => {
      buffers.push(chunk)
    })
    req.on('end', () => {
      const result = Buffer.concat(buffers).toString()
      let body
      const contentType = req.headers['content-type']
      if (contentType === 'application/x-www-form-urlencoded') {
        body = querystring.parse(result)
      } else if (contentType === 'application/json') {
        body = JSON.parse(result)
      } else {
        body = result
      }
      console.log('body', body)
    })
  }
  res.end('ok')
})

server.listen(3000)
