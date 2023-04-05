const http = require('http')

const lanPack = {
  'en-Us': {
    title: 'welcome'
  },
  zh: {
    title: '欢迎'
  },
  default: 'zh'
}

const server = http.createServer()

server.on('request', (req, res) => {
  const acceptLanguage = req.headers['accept-language']
  // en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7
  const values = acceptLanguage.split(',')
  const valueMaps = values.map(item => {
    const [name, qualitis] = item.split(';')
    return {
      name,
      quality: qualitis ? parseFloat(qualitis.split('=')[1]) : 1
    }
  }).sort((a, b) => b.quality - a.quality)
  let contentLanguage = lanPack.default
  for (let i = 0; i < valueMaps.length; i++) {
    const lan = valueMaps[i]
    if (lanPack[lan.name]) {
      contentLanguage = lan.name
      break
    }
  }
  console.log(contentLanguage)
  res.setHeader('Content-Language', contentLanguage)
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  res.end(lanPack[contentLanguage].title)
})

server.listen(3000, err => {
  if (!err) {
    console.log('server running at http://localhost:3000')
  }
})
