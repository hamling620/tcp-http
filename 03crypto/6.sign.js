// 在网络中，私钥的拥有者可以在网络数据发送之前，先对数据进行一个签名得到一个签名（sign），通过网络把签名发送给数据接受者之后，数据的接受者可以通过公钥来对改签名进行验证，以确保这段数据是私钥拥有者所发生的原始数据，且在网络传输中未被修改
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const private_key = fs.readFileSync(path.join(__dirname, 'rsa_private.pem'))
const public_key = fs.readFileSync(path.join(__dirname, 'rsa_public.pem'))

// 签名
const str = 'hamling'
const sign = crypto.createSign('RSA-SHA256')
sign.update(str)
const signed = sign.sign(private_key, 'hex')

// 验证签名
const verify = crypto.createVerify('RSA-SHA256')
verify.update(str)
const verified = verify.verify(public_key, signed, 'hex')
console.log(verified)

// 私钥签名，公钥来验证
