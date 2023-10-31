const querystring = require('querystring')
const crypto = require('crypto')

// 设置cookie的方法
function cookie(req, key, value, options = {}) {
  value = encodeURIComponent(value)
  const result = []
  const pairs = [`${key}=${value}`]

  if (options.maxAge !== null) {
    options.maxAge += 0
    pairs.push(`Max-Age=${Math.floor(options.maxAge)}`)
  }
  if (options.domain) {
    pairs.push(`Domain=${options.domain}`)
  }
  if (options.expires) {
    pairs.push(`Expires=${options.expires.toUTCString()}`)
  }
  if (options.path) {
    pairs.push(`Path=${options.path}`)
  }
  if (options.httpOnly) {
    pairs.push(`HttpOnly=true`)
  }
  if (options.secure) {
    pairs.push(`Secure=true`)
  }

  if (options.signed && req.secret) {
    result.push(`${key}.sign=${sign(`${key}=${value}`, req.secret)}`)
  }
  result.push(pairs.join('; '))
  return result
}

function setCookie(req, res) {
  return function (...args) {
    res.setHeader('set-cookie', cookie(req, ...args))
  }
}

function getCookie(req, res) {
  return function (key, options = {}) {
    let cookies = req.headers.cookie || ''
    cookies = querystring.parse(cookies, '; ', '=')
    console.log(key, cookies)
    if (options.signed && req.secret) {
      const value = `${key}=${cookies[key]}`
      if (cookies[`${key}.sign`] !== sign(value, req.secret)) {
        return 'must login!'
      }
    }
    return decodeURIComponent(cookies[key])
  }
}

function cookieParser(secret) {
  return function (req, res, next) {
    req.secret = secret
    let cookies = req.headers.cookie || ''
    res.cookie = setCookie(req, res)
    req.cookies = querystring.parse(cookies, '; ', '=')
    req.cookie = getCookie(req, res)
    next()
  }
}

function sign(value, secret) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url')
}

module.exports = cookieParser
