const path = require('path')
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

app.use(express.static(path.join(__dirname, '../')))

// 反向代理
// app.use('/api', createProxyMiddleware({
//   target: 'http://localhost:3000',
//   changeOrigin: true, // 代理服务器会在请求转发时修改请求头的host为目标服务器的host
//   pathRewrite: {
//     '^/api': ''
//   }
// }))

app.listen(4000)
