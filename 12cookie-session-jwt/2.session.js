const express = require('express')
const uuid = require('uuid')
const cookieParser = require('./cookie-parser')

const app = express()
app.use(cookieParser())

const SID_KEY = 'connect.sid'
const session = {}

app.get('/visit', (req, res) => {
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  const sid = req.cookies[SID_KEY] // cookie中的sid
  if (!sid) {
    const sid = uuid.v4()
    res.cookie(SID_KEY, sid)
    session[sid] = { visit: 1 }
    res.end('first visit')
  } else {
    const value = session[sid]
    if (!value) {
      res.cookie(SID_KEY, '')
      res.end('你的登录信息作废了，请重新登录')
    } else {
      res.end(`你已经访问${++value.visit}次，欢迎下次再来`)
    }
  }
})

app.listen(3000)
