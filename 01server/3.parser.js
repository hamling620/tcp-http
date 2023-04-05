// parser解析出请求对象，其实就是socket.on('data')拿到的data，就是请求信息，解析出请求头，再传递给请求监听函数

const fs = require('fs')
const path = require('path')
const { StringDecoder } = require('string_decoder')

// 把buffer转换成字符串，保证不乱码
const decoder = new StringDecoder()

// 按理说是\r\n，这里不好模拟
function parser (requestReadStream, requestListener) {
  function onReadable () {
    let buf
    let buffers = []
    while (null != (buf = requestReadStream.read())) {
      buffers.push(buf)
      const str = decoder.write(buf)
      const result = Buffer.concat(buffers).toString()
      if (str.match(/\n\n/)) {
        const values = str.split('\n\n')
        const headers = parseHeader(values.shift())
        Object.assign(requestReadStream, headers)
        const body = values.join('\n\n')
        requestReadStream.removeListener('readable', onReadable)
        requestReadStream.unshift(body)
        return requestListener(requestReadStream)
      }
    }
  }
  requestReadStream.on('readable', onReadable)
}

function parseHeader (headerStr) {
  const lines = headerStr.split(/\n/)
  const startLine = lines.shift()
  const [ method, url, protocol ] = startLine.split(' ')
  const [protocolName, protocolVersion] = protocol.split('/')
  const headers = {}
  lines.forEach(line => {
    const [key, value] = line.split(': ')
    headers[key] = value
  })
  return {
    headers,
    method,
    url,
    protocol,
    protocolName,
    protocolVersion
  }
}

const rs = fs.createReadStream(path.join(__dirname, 'req_msg.txt'))
parser(rs, req => {
  const { method } = req
  console.log(method)
  req.on('data', data => {
    console.log('data', data.toString())
  })
  req.on('end', () => {
    console.log('请求结束，响应res.end')
  })
})
