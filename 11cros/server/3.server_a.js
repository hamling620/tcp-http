const path = require('path')
const express = require('express')

const app = express()

app.use(express.static(path.join(__dirname, '../public1')))

app.listen(3000)
