// 可以使用zlib模块进行压缩和解压缩操作，压缩文件以后可以减少文件体积，加快传输速度和节约贷款

// 压缩创建的是transform流，继承自双工流

const zlib = require('zlib')
const fs = require('fs')
const path = require('path')

console.log(process.cwd())

function gzip (src) {
  fs.createReadStream(src)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(src + '.gz'))
}

// gzip(path.join(__dirname, 'msg.txt'))

function gunzip (src) {
  fs.createReadStream(src)
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(path.join(__dirname, path.basename(src, '.gz'))))
}

gunzip(path.join(__dirname, 'msg.txt.gz'))
