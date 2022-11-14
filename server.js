const express = require('express')
const path = require('path')
const { faker } = require('@faker-js/faker')
const app = express()
const colors = require('colors')
const webPush = require('web-push')
const cors = require('cors')
app.use(cors())

app.use(express.static(path.join(__dirname, './view-with-react/build')))

let isDisableKeepAlive = false

app.use(express.urlencoded({ extended: false }))

app.post('/subscribe', async (req, res, next) => {
  console.log('===== POST call')
  console.log('***** req.headers: >>' + JSON.stringify(req.headers) + '<<')

  console.log('***** req.url: ' + JSON.stringify(req.url))
  console.log('***** req.query: ' + JSON.stringify(req.query))
  console.log('***** req.body: ' + JSON.stringify(req.body))

  const options = {
    vapidDetails: {
      subject: 'mailto:myemail@example.com',
      publicKey: process.env.PUBLIC_KEY,
      privateKey: process.env.PRIVATE_KEY
    }
  }
  try {
    const res2 = await webPush.sendNotification(
      newSubscription,
      JSON.stringify({
        title: 'Hello from server',
        description: 'this message is coming from the server',
        image:
          'https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg'
      }),
      options
    )
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

// keep-alive 해제용 미들웨어
app.use(function (req, res, next) {
  if (isDisableKeepAlive) {
    res.set('Connection', 'close') // 만약 전역 변수가 true면 요청 오면 connection을 강제로 닫는다.
  }
  next()
})

app.get('/', function (req, res) {
  res.header('Set-Cookie', 'cross-site-cookie=whatever; SameSite=None; Secure')
  res.sendFile(path.join(__dirname, './view-with-react/build/index.html'))
})

function createRandomProduct() {
  return {
    productId: faker.datatype.uuid(),
    productDescription: faker.commerce.productDescription(),
    productImg: faker.image.business(450, 200, true),
    productName: faker.commerce.productName(),
    productCategory: faker.commerce.productAdjective(),
    productPrice: faker.commerce.price(1000, 2000, 0),
    sellerAvatar: faker.image.people(200, 200, true),
    sellerName: faker.internet.userName(),
    sellerEmail: faker.internet.email(),
    company: faker.company.name(),
    companyDomain: faker.internet.url(),
    registeredAt: faker.date.past()
  }
}

function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
    addressCity: faker.address.cityName()
  }
}

app.get('/products', function (req, res) {
  console.log('===== GET call')
  console.log('***** req.headers: >>' + JSON.stringify(req.headers) + '<<')

  console.log('***** req.url: ' + JSON.stringify(req.url))
  console.log('***** req.query: ' + JSON.stringify(req.query))
  console.log('***** req.body: ' + JSON.stringify(req.body))

  const Products = []
  Array.from({ length: 10 }).forEach(() => {
    Products.push(createRandomProduct())
  })

  res.header('Set-Cookie', 'cross-site-cookie=whatever; SameSite=None; Secure')
  res.json(Products)
})

app.get('/users', function (req, res) {
  console.log('===== GET call')
  console.log('***** req.headers: >>' + JSON.stringify(req.headers) + '<<')

  console.log('***** req.url: ' + JSON.stringify(req.url))
  console.log('***** req.query: ' + JSON.stringify(req.query))
  console.log('***** req.body: ' + JSON.stringify(req.body))

  const Users = []
  Array.from({ length: 10 }).forEach(() => {
    Users.push(createRandomUser())
  })

  res.json(Users)
})

app.get('/policy', function (req, res) {
  let d = new Date()
  console.log('^^^^^^GET call: ' + d.toLocaleTimeString().red + ', ' + d.getMilliseconds().toString().green)

  console.log('***** req.headers: >>' + JSON.stringify(req.headers) + '<<')
  console.log('*** req.url: ' + JSON.stringify(req.url))
  console.log('*** req.query: ' + JSON.stringify(req.query))
  console.log('*** req.body: ' + JSON.stringify(req.body))

  res.status(200)
  res.setHeader('Content-Type', 'text/plain')
  res.header('Accept-CH', 'UA, Platform, Arch')

  res.header('Access-Control-Allow-Origin', '*')
  // res.header("Access-Control-Allow-Credentials", false);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  // res.header("Access-Control-Max-age", 3600);
  res.header(
    'Access-Control-Expose-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Methods, Access-Control-Request-Headers, access-control-allow-headers, access-control-allow-methods, access-control-allow-origin, access-control-max-age, Access-Control-Allow-Credentials, Cp-Allow, Cp-App, Cp-Cid, Cp-Debug, Cp-Domain, Cp-Private, Cp-Source-Ip, Cp-Force-Stop, Cp-Force-Delete-FailedLogs, Cp-Crash-Domain, Cp-Repeat-Interval, Cp-LNC-Id'
  )

  res.setHeader('Cp-Allow', '*')
  res.setHeader('Cp-App', '0')
  res.setHeader('Cp-Cid', 'dummyCid')
  res.setHeader('Cp-Debug', '0')
  res.setHeader('Cp-Domain', 'https://gmb.acecounter.com')
  res.setHeader('Cp-Private', '0')
  res.setHeader('Cp-Source-Ip', '127.0.0.1')
  res.setHeader('Cp-Force-Stop', '0')
  res.setHeader('Cp-Force-Delete-FailedLogs', '0')
  res.setHeader('Cp-Crash-Domain', 'http://jinsang.myds.me/lnc')
  res.setHeader('Cp-Repeat-Interval', '21600')
  res.setHeader('Cp-LNC-Id', '1iAMEe1l2dAylAF1')

  console.log('***** res.headers: >>' + JSON.stringify(res.getHeaders(), null, 2) + '<<')

  res.send('done')
})

app.post('/policy', function (req, res) {
  let d = new Date()
  console.log('>>> POST call: ' + d + ', ' + d.getMilliseconds())
  console.log('***** req.headers: >>' + JSON.stringify(req.headers) + '<<')

  console.log('req.url: ' + JSON.stringify(req.url, null, 2).bgCyan.black)
  console.log('req.query: ' + JSON.stringify(req.query, null, 2))
  console.log('req.body: ' + JSON.stringify(req.body, null, 2))

  res.status(200)
  res.setHeader('Content-Type', 'application/json')
  // res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader('Cp-Allow', '*')
  res.setHeader('Cp-App', '0')
  res.setHeader('Cp-Cid', 'dummyCid')
  res.setHeader('Cp-Debug', '0')
  res.setHeader('Cp-Domain', 'https://gmb.acecounter.com')
  res.setHeader('Cp-Private', '0')
  res.setHeader('Cp-Source-Ip', '127.0.0.1')
  res.setHeader('Cp-Force-Stop', '0')
  res.setHeader('Cp-Force-Delete-FailedLogs', '0')
  res.setHeader('Cp-Crash-Domain', 'http://jinsang.myds.me/lnc')
  res.setHeader('Cp-Repeat-Interval', '21600')
  res.setHeader('Cp-LNC-Id', '1iAMEe1l2dAylAF1')

  res.send('done')
})

let logListener = function (req, res) {
  let d = new Date()
  console.log('^^^^^^GET call: ' + d + ', ' + d.getMilliseconds())

  console.log('***** req.headers: >>' + JSON.stringify(req.headers) + '<<')
  console.log('*** req.url: ' + JSON.stringify(req.url))
  console.log('*** req.query: ' + JSON.stringify(req.query))
  console.log('*** req.body: ' + JSON.stringify(req.body))

  res.status(200)
  res.setHeader('Content-Type', 'application/json')
  res.send('done')
}
app.get('/mac', logListener)
app.get('/log', logListener)
app.get('/log/mac', logListener)

app.get('*', function (req, res) {
  res.header('Set-Cookie', 'cross-site-cookie=whatever; SameSite=None; Secure')
  res.sendFile(path.join(__dirname, './view-with-react/build/index.html'))
})

const server = app.listen(8080, function () {
  console.log('listening on 8080')
})

// 만일 process로부터 SIGINT 이벤트를 받으면..
process.on('SIGINT', function () {
  // SIGINT 시그널을 받으면 전역변수를 true로 만들어 앞으로 요청오면 종료해 버리게 만든다.
  isDisableKeepAlive = true
  // 어플리케이션을 닫음
  server.close(function () {
    console.log('server closed')
    process.exit(0) // 정상 종료
  })
})
