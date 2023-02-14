import { faker } from '@faker-js/faker'
import { getRandomIntInclusive } from '../utils'
import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus
} from '@jinsang/slimer-react'
import type { ProductForType } from '../hooks'

export function gcodeSelector(): string {
  return 'AK3A79964'
}

export function newFakeProducts(cnt: number) {
  const _products: ProductForType[] = []
  Array(cnt)
    .fill(undefined)
    .map((noUse) => {
      const quantity = getRandomIntInclusive(1, 20)
      const productPrice = Number(faker.commerce.price(1000, 2000, 0))
      _products.push({
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
        registeredAt: faker.date.past().toLocaleDateString(),
        quantity: quantity,
        optionCode: getRandomIntInclusive(1, 30).toString(),
        totalPrice: quantity * productPrice
      })
    })
  return _products
}

export function sendCommonWithCB(argMessage: string, params: ACParams): void {
  const msg = `\n\n\n\n CB ${argMessage} 클릭!`
  console.log(msg)
  console.log(JSON.stringify(params, null, 2))

  ACS.send(params, (error?: object, result?: ACEResponseToCaller) => {
    console.log(`${argMessage}::in CB`)
    console.log('error: ' + JSON.stringify(error, null, 2))
    console.log('result: ' + JSON.stringify(result, null, 2))
  })
}

export function sendCommonWithPromise(argMessage: string, params: ACParams): void {
  const msg = `\n\n\n\n Promise ${argMessage} 클릭!`
  console.log(msg)
  console.log(JSON.stringify(params, null, 2))

  ACS.send(params)
    .then((response) => {
      console.log(`${argMessage}::in then!!`)
      if (response) {
        console.log('response: ' + JSON.stringify(response, null, 2))
      } else {
        console.log('response is undefined.')
      }
    })
    .catch((err) => {
      console.log(`${argMessage}::in reject!!`)
      if (err) {
        console.log('err: ' + JSON.stringify(err, null, 2))
      } else {
        console.log('err is undefined.')
      }
    })
}
