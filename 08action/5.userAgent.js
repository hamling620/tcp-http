const http = require('http')
const userAgentParser = require('user-agent-parser')

const server = http.createServer((req, res) => {
  const userAgent = req.headers['user-agent']
  res.end(JSON.stringify(userAgentParser(userAgent)))
})

server.listen(4000)
