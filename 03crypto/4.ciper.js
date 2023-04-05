// 对称加密 加密+摘要
// blowfish算法是一种对称的加密算法，对称的意思就是加密解密都是同一个私钥
// aes也是对称加密算法
// 对称加密不能把安全地把秘钥传递出来

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const pk = fs.readFileSync(path.join(__dirname, 'rsa_private.pem'))
// console.log('pk', pk)
const cipher = crypto.createCipher('aes192', pk)
let crypted = cipher.update('abcd', 'utf8')
console.log('crypted', crypted.toString())
crypted += cipher.final('hex')
console.log(crypted)

const decipher = crypto.createDecipher('aes192', pk)
let decrypted = decipher.update(crypted, 'hex') // 格式要对应，例外反向
decrypted += decipher.final('utf8')
console.log(decrypted)
