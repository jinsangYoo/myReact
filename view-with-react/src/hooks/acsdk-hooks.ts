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
}

const useACSDK = ({ type, msg, randomValue, product, join, leave, login }: ACSDKProps) => {
  const url = `>>${msg}<< >>${randomValue}<<`
  const params = ACParams.init(type, url)

  switch (type) {
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

    case ACParams.TYPE.LEAVE:
      if (leave) {
        params.userId = leave.userId
      }
      break

    default:
      break
  }

  sendCommonWithPromise(url, params)
}

export default useACSDK
