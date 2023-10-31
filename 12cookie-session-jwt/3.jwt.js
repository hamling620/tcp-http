const express = require('express')
const crypto = require('crypto') // jsonWebToken

const jwt = {
  sign(value, secret) {
    return crypto.createHmac('sha256', secret).update(value).digest('base64url')
  },
  toBase64(value) {
    return Buffer.from(JSON.stringify(value)).toString('base64url')
  },
  base64ToString(value) {
    return Buffer.from(value, 'base64url').toString()
  },
  encode(payload, secret) {
    const header = { typ: 'JWT', alg: 'HS256' }
    const segments = []
    segments.push(this.toBase64(header))
    segments.push(this.toBase64(payload))
    const sign = this.sign(segments.join('.'), secret) // 签名是前两个部分以.隔开加起来
    segments.push(sign)
    return segments.join('.')
  },
  decode(token, secret) {
    const segments = token.split('.')
    const newSign = this.sign(segments[0] + '.' + segments[1], secret)
    const payload = JSON.parse(this.base64ToString(segments[1]))
    if (newSign !== segments[2]) {
      throw new Error('verify failed')
    }
    if (payload.expires && payload.expires <= Date.now()) {
      throw new Error('expired')
    }
    return payload
  }
}

// header { typ: 'JWT', alg: 'HS256' }

const app = express()
const secret = 'hello'

app.get('/login', (req, res) => {
  res.end(jwt.encode({ username: 'hello', expires: Date.now() + 20000 }, secret))
})

app.get('/validate', (req, res) => {
  try {
    res.json(jwt.decode(req.query.token, secret))
  } catch (e) {
    res.end(e.message)
  }
})

app.listen(3000)
