// 散列哈希算法
// md5 sha1 sha256
// 相同的输入有相同的输出
// 不同的输入一定产生不同的输出
// 任意输入长度，生成的都是固定的长度
// 不能进行逆向

// 用来检验要下载的文件是否被改动过
// 对密码进行加密

const crypto = require('crypto')

// console.log(crypto.getHashes())
const md5 = crypto.createHash('md5')
md5.update('hello world')
console.log(md5.digest('hex'))

const sha1 = crypto.createHash('sha1')
sha1.update('hello ')
sha1.update('world') 
console.log(sha1.digest('hex'))

// 5eb63bbbe01eeed093cb22bb8f5acdc3
// 2aae6c35c94fcfb415dbe95f408b9ce91ee846ed

// 当客户访问服务器的时候，服务器可能返回了一个Content-MD5的响应头，这个值就是一个MD5值
