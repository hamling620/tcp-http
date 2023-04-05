const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const hmac = crypto.createHmac('sha1', 'xxxxxx') //加盐
hmac.update('hello world')
const result = hmac.digest('base64') // hex
console.log(result) // NfvSklhEN+vooWb5AfO0Ru8SyBY=

const pem = fs.readFileSync(path.join(__dirname, 'rsa_public.pem'))
const secrete = pem.toString('ascii')
const hmac1 = crypto.createHmac('sha256', secrete)
hmac1.update('hello world')
const res = hmac1.digest('hex')
console.log(res)
