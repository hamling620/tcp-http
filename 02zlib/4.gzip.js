const zlib = require('zlib')
const msg = 'hello'

// 压缩字符串，如果字符串长度很小，压缩出来的长度会变大
zlib.gzip(msg, (err, buffer) => {
  console.log(buffer.length)
  zlib.gunzip(buffer, (err, res) => {
    console.log(res.toString())
  })
})

// __dirname是当前文件所在目录，模块内的变量
// process.cwd()当前工作目录，也就是执行node命令的目录，这是可变的
