const express = require('express')
const path = require('path')
const { faker } = require('@faker-js/faker')
const app = express()
const cors = require('cors')
app.use(cors())

app.use(express.static(path.join(__dirname, './view-with-react/build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './view-with-react/build/index.html'))
})

function createRandomProduct() {
  return {
    productId: faker.datatype.uuid(),
    productDescription: faker.commerce.productDescription(),
    productImg: faker.image.business(450, 200, true),
    productName: faker.commerce.productName(),
    productPrice: faker.commerce.price(100, 200, 0),
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

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './view-with-react/build/index.html'))
})

app.listen(8080, function () {
  console.log('listening on 8080')
})
