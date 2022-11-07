import * as React from 'react'
import type { ProductForType } from './product-hooks'

import {
  AceConfiguration,
  ACParams,
  ACS,
  ACEResponseToCaller,
  ACProduct,
  ACEGender,
  ACEMaritalStatus
} from '@jinsang/slimer-react'
import { sendCommonWithPromise, sendCommonWithCB, getRandomIntInclusive } from '../utils'

interface ACSDKProps {
  type: any
  msg: string
  randomValue?: string
  product?: ProductForType
  buy?: {
    orderNumber: string
    payMethodName: string
    products?: ProductForType[]
  }
  cart?: {
    products?: ProductForType[]
  }
  join?: {
    userId: string
  }
  leave?: {
    userId: string
  }
  login?: {
    userId: string
    userAge: number
    userGender: ACEGender
    userMaritalStatus: ACEMaritalStatus
  }
  search?: {
    keyword: string
  }
}

const convertProductForTypeToACProduct = (products: ProductForType[]) =>
  products.map((product) => {
    return new ACProduct(
      product.productName,
      product.productCategory,
      product.totalPrice?.toString() ?? '0',
      product.quantity,
      product.productId,
      product.optionCode
    )
  })

const useACSDK = ({ type, msg, randomValue, product, buy, cart, join, leave, login, search }: ACSDKProps) => {
  const url = `>>${msg}<< >>${randomValue}<<`
  const params = ACParams.init(type, url)

  switch (type) {
    case ACParams.TYPE.ADDCART:
    case ACParams.TYPE.DELCART:
      params.memberKey = `멤버ID >>${randomValue && randomValue + 0}<<`
      if (cart) {
        if (cart.products) {
          params.products = convertProductForTypeToACProduct(cart.products)
        }
      }

      break
    case ACParams.TYPE.BUY_DONE:
    case ACParams.TYPE.BUY_CANCEL:
      params.memberKey = `멤버ID >>${randomValue && randomValue + 0}<<`
      if (buy) {
        params.orderNumber = buy.orderNumber
        params.payMethodName = buy.payMethodName
        if (buy.products) {
          params.products = convertProductForTypeToACProduct(buy.products)
        }
      }
      break
    case ACParams.TYPE.APPEAR_PRODUCT:
      params.memberKey = `멤버ID >>${randomValue && randomValue + 0}<<`
      if (product) {
        params.productName = product.productName
        params.productCategoryName = product.productCategory
        params.productId = product.productId
        params.productPrice = product.productPrice
      }
      break

    case ACParams.TYPE.LOGIN:
      if (login) {
        params.userId = login.userId
        params.userAge = login.userAge
        params.userGender = login.userGender
        params.userMaritalStatus = login.userMaritalStatus
      }
      break

    case ACParams.TYPE.JOIN:
      if (join) {
        params.userId = join.userId
      }
      break

    case ACParams.TYPE.LEAVE:
      if (leave) {
        params.userId = leave.userId
      }
      break

    case ACParams.TYPE.SEARCH:
      if (search) {
        params.keyword = search.keyword
      }
      break

    default:
      break
  }

  sendCommonWithPromise(url, params)
}

export default useACSDK
