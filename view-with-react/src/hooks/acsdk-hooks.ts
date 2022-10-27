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
  randomValue: string
  product: ProductForType
}

const useACSDKHelper = ({ type, msg, randomValue, product }: ACSDKProps) => {
  const memberKey = `멤버ID >>${randomValue + 0}<<`

  const url = `>>${msg}<< >>${randomValue}<<`
  const params = ACParams.init(type, url)
  params.memberKey = memberKey
  params.productName = product.productName
  params.productCategoryName = product.productCategory
  params.productId = product.productId
  params.productPrice = product.productPrice
  sendCommonWithPromise(url, params)
}

export default useACSDKHelper
