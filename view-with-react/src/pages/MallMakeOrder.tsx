import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link, useLocation } from 'react-router-dom'

import { faker } from '@faker-js/faker'
import { ProductForType, useCart, useOrder, IStateToOrder, OrderType, randomGetPayMethod } from '../hooks'

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
  const { addOrder } = useOrder()
  const [orderName, setOrderName] = useState(faker.name.firstName())
  const { removeAllInCart } = useCart()

  var newOrder: OrderType = {
    ordererName: '',
    orderState: 'MakeOrder',
    orderNumber: '',
    payMethodName: randomGetPayMethod(),
    products: []
  }
  if (state.myState.from === 'cart') {
    const { products } = useCart()
    newOrder.orderNumber = faker.datatype.uuid()
    if (state.myState.productId) {
      newOrder.products = products.filter((product) => product.productId === state.myState.productId)
    } else {
      newOrder.products = products
    }
  } else if (state.myState.from === 'detail') {
    const { order } = useOrder()
    newOrder = order
  }

  const handlePay = () => {
    if (state.myState.from === 'cart') {
      removeAllInCart()
    }
    console.log(`handlePay::orderName: ${orderName}`)
    newOrder.ordererName = orderName
    addOrder(newOrder)
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
      <h1>주문자 정보</h1>
      <div style={{ width: '80%', border: '3px solid #eee', display: 'flex' }}>
        <div style={{ marginLeft: '20px' }}>
          이름:
          <TextField
            sx={{ ml: 1 }}
            required
            id="filled-required"
            label="Required"
            defaultValue={orderName}
            variant="filled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrderName(e.currentTarget.value)}
          />
        </div>
        <div style={{ marginLeft: '20px' }}>
          결제:
          <Link to="/mall/orderDone" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" sx={{ ml: 1 }} onClick={handlePay}>
              결제
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function Product(props: { index: number; product: ProductForType }) {
  console.log(`MallMakeOrder::product: ${JSON.stringify(props.product, null, 2)}`)
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

interface CountryType {
  code: string
  label: string
  phone: string
  suggested?: boolean
}

const countries: readonly CountryType[] = [
  {
    code: 'KP',
    label: "Korea, Democratic People's Republic of",
    phone: '850'
  },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' }
]
