const http = require('http')

const options = {
  host: 'localhost',
  port: 3000,
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
const req = http.request(options)

req.on('response', res => {
  console.log(res.statusCode)
  console.log(res.headers)
  const buffers = []
  res.on('data', chunk => {
    buffers.push(chunk)
  })
  res.on('end', () => {
    const result = Buffer.concat(buffers)
    console.log(result.toString())
  })
})

// 向请求体写入数据
req.write('name=hamling&age=18')

// 结束请求，只有调用end方法才会向服务器发送请求
req.end()
