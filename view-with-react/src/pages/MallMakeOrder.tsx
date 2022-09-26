import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link, useLocation } from 'react-router-dom'

import { faker } from '@faker-js/faker'
import { getRandomIntInclusive } from '../utils'
import {
  ProductForType,
  useProduct,
  useCart,
  CustomizedHook,
  useOrder,
  IStateToOrder,
  OrderType
} from '../hooks'

const Image = styled('img')({
  width: '100%',
  borderRadius: 10
})

interface StateTypeForLocationOrder {
  state: {
    myState: IStateToOrder
  }
}

export default function MallMakeOrder() {
  const { state } = useLocation() as StateTypeForLocationOrder
  console.log(`from: ${state.myState.from}`)

  var newOrder: OrderType = {
    orderState: 'MakeOrder',
    orderNumber: '',
    payMethodName: '',
    products: []
  }
  if (state.myState.from === 'cart') {
    const { products } = useCart()
    newOrder.products = products
  } else if (state.myState.from === 'detail') {
    const { order } = useOrder()
    newOrder = order
  }

  return (
    <div>
      <div style={{ width: '80%', border: '3px solid #eee' }}>
        {newOrder.products.length < 1 ? (
          <p>카트가 비었습니다.</p>
        ) : (
          newOrder.products.map((product, index) => <Product key={index} index={index} product={product} />)
        )}
      </div>
      <div style={{ width: '80%', border: '3px solid #eee' }}>
        <h1>주문 정보</h1>
      </div>
    </div>
  )
}

function Product(props: { index: number; product: ProductForType }) {
  return (
    <div style={{ borderBottom: '1px', borderBottomColor: '#eee', borderBottomStyle: 'solid' }}>
      <Box sx={{ display: 'flex', p: 1, m: 1, alignItems: 'center' }}>
        <Typography>
          {props.index + 1}. 제품명: {props.product.productName}
        </Typography>
      </Box>
      <Image sx={{ width: '30%' }} src={props.product.productImg} alt="" />
      <Box sx={{ width: '100%' }}>
        <Typography display="inline" variant="subtitle1" color="text.secondary">
          제품 가격:{' '}
          {Number(props.product.productPrice).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}{' '}
          원
        </Typography>

        <Typography display="inline" variant="subtitle1" color="text.secondary" sx={{ ml: 5 }}>
          제품 수량:{' '}
          {Number(props.product.quantity).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}
        </Typography>
        {props.product.totalPrice && (
          <Typography display="inline" variant="subtitle1" color="text.secondary" sx={{ ml: 5 }}>
            전체 가격:{' '}
            {props.product.totalPrice.toLocaleString(navigator.language, {
              minimumFractionDigits: 0
            })}
          </Typography>
        )}
        {props.product.optionCode && (
          <Typography display="inline" variant="subtitle1" color="text.secondary" sx={{ ml: 5 }}>
            옵션 코드: {props.product.optionCode}
          </Typography>
        )}
      </Box>
    </div>
  )
}
