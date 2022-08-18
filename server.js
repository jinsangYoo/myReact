const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
app.use(cors())

app.use(express.static(path.join(__dirname, './view-with-react/build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './view-with-react/build/index.html'))
})

app.get('/product', function (req, res) {
  res.json({ name: 'balck shoes' })
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './view-with-react/build/index.html'))
})

app.listen(8080, function () {
  console.log('listening on 8080')
})
