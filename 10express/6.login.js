const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.engine('.html', ejs.__express)

app.get('/signup', (req, res) => {
  res.render('signup.html')
})
const users = []
app.post('/signup', (req, res) => {
  const { username } = req.body
  const user = users.find(item => item.username === username)
  if (user) {
    res.redirect('/signup')
  } else {
    users.push(req.body)
    res.redirect('/signin')
  }
})

app.get('/signin', (req, res) => {
  res.render('signin.html')
})

app.post('/signin', (req, res) => {
  const { password, username } = req.body
  const user = users.find(item => {
    return item.username === username && item.password === password
  })
  if (user) {
    res.redirect('/welcome')
  } else {
    res.redirect('/signin')
  }
})

app.get('/welcome', (req, res) => {
  res.render('welcome.html')
})

app.listen(3000)
