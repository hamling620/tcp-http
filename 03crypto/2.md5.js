const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const rs = fs.createReadStream(path.join(__dirname, 'msg.txt'), { highWaterMark: 2 })
const md5 = crypto.createHash('md5')
rs.on('data', data => {
  md5.update(data)
})

rs.on('end', () => {
  const md5Value = md5.digest('hex')
  // rs.setHeader('Content-Md5', md5Value)
  console.log(md5Value)
})
