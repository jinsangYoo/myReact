import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link, useLocation, useParams } from 'react-router-dom'

import { faker } from '@faker-js/faker'
import {
  ProductForType,
  useCart,
  useOrder,
  IStateToOrder,
  OrderType,
  CustomizedHook,
  useProduct
} from '../hooks'
import { getRandomIntInclusive } from '../utils'

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
  const { resetProduct } = useProduct()
  const { productId } = useParams()
  const { state } = useLocation() as StateTypeForLocationOrder
  const { addOrder } = useOrder()
  const [orderName, setOrderName] = useState(faker.name.firstName())
  const { removeAllInCart, removeProduct } = useCart()
  const [defaultPayMethodIndex] = useState(getRandomIntInclusive(0, 5))
  const samplesPayMethods = React.useMemo(
    () => ['cash', 'kakao pay', 'naver pay', 'credit card', 'smile pay', 'payco'],
    []
  )
  useEffect(() => {
    return () => resetProduct()
  }, [])

  var newOrder: OrderType = {
    ordererName: '',
    orderState: 'MakeOrder',
    orderNumber: '',
    payMethodName: samplesPayMethods[defaultPayMethodIndex],
    products: []
  }
  if (state.myState.from === 'cart') {
    const { products } = useCart()
    newOrder.orderNumber = faker.datatype.uuid()
    if (productId) {
      newOrder.products = products.filter((product) => product.productId === productId)
    } else {
      newOrder.products = products
    }
  } else if (state.myState.from === 'detail') {
    const { order } = useOrder()
    newOrder = order
  }

  const handlePay = () => {
    if (state.myState.from === 'cart') {
      if (productId) {
        const willRemoveProduct = newOrder.products.find((product) => product.productId === productId)
        willRemoveProduct && removeProduct(willRemoveProduct)
      } else {
        removeAllInCart()
      }
    }
    newOrder.ordererName = orderName
    addOrder(newOrder)
  }

  const handleSelectedOptions = (payMethod: string) => {
    newOrder.payMethodName = payMethod
  }

  return (
    <div>
      <div style={{ width: '80%', border: '3px solid #eee' }}>
        {newOrder.products.length < 1 ? (
          <p>????????? ???????????????.</p>
        ) : (
          newOrder.products.map((product, index) => <Product key={index} index={index} product={product} />)
        )}
      </div>
      <h2>?????? ??????</h2>
      <div style={{ width: '80%', border: '3px solid #eee', display: 'flex', padding: 10 }}>
        <div style={{ marginLeft: '20px' }}>
          ?????? ?????? ??????:{' '}
          {newOrder.products
            .reduce((preValue, product) => (product.totalPrice ?? 0) + preValue, 0)
            .toLocaleString(navigator.language, {
              minimumFractionDigits: 0
            })}{' '}
          ???
        </div>
        <div style={{ marginLeft: '20px' }}>
          <CustomizedHook
            labelName="?????? ?????? ??????"
            defaultValueIndex={defaultPayMethodIndex}
            minWidth={200}
            samples={samplesPayMethods}
            onSelectedOptions={handleSelectedOptions}
          />
        </div>
      </div>
      <h2>????????? ??????</h2>
      <div style={{ width: '80%', border: '3px solid #eee', display: 'flex', padding: 10 }}>
        <div style={{ marginLeft: '20px' }}>
          ??????:
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
          ??????:
          <Link to="/mall/orderDone" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" sx={{ ml: 1 }} onClick={handlePay}>
              ??????
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function Product(props: { index: number; product: ProductForType }) {
  return (
    <div style={{ borderBottom: '1px', borderBottomColor: '#eee', borderBottomStyle: 'solid' }}>
      <Box sx={{ display: 'flex', p: 1, m: 1, alignItems: 'center' }}>
        <Typography>
          {props.index + 1}. ?????????: {props.product.productName}
        </Typography>
      </Box>
      <Image sx={{ width: '30%' }} src={props.product.productImg} alt="" />
      <Box sx={{ width: '100%' }}>
        <Typography display="inline" variant="subtitle1" color="text.secondary">
          ?????? ??????:{' '}
          {Number(props.product.productPrice).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}{' '}
          ???
        </Typography>

        <Typography display="inline" variant="subtitle1" color="text.secondary" sx={{ ml: 5 }}>
          ??????:{' '}
          {Number(props.product.quantity).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}
        </Typography>
        {props.product.totalPrice && (
          <Typography display="inline" variant="subtitle1" color="text.secondary" sx={{ ml: 5 }}>
            ??????x??????:{' '}
            {props.product.totalPrice.toLocaleString(navigator.language, {
              minimumFractionDigits: 0
            })}{' '}
            ???
          </Typography>
        )}
        {props.product.optionCode && (
          <Typography display="inline" variant="subtitle1" color="text.secondary" sx={{ ml: 5 }}>
            ?????? ?????????: {props.product.optionCode}
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
