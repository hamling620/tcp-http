const express = require('express')
const ejs = require('ejs')
const path = require('path')

const app = express()

// 模板使用ejs后缀
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.engine('.html', ejs.__express)

app.get('/', (req, res) => {
  res.render('index.html', { name: 'haming', age: 18 })
})