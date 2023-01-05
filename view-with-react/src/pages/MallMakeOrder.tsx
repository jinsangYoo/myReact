import React, { useState, useReducer, useEffect, useCallback, useMemo, useLayoutEffect } from 'react'
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
  useProduct,
  ACSDK
} from '../hooks'

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
import { SamplesPayMethods } from '../data'

const Image = styled('img')({
  width: '100%',
  borderRadius: 10
})

interface StateTypeForLocationOrder {
  state: {
    myState: IStateToOrder
  }
}

const title = 'mall_주문서_작성'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
const MallMakeOrder = () => {
  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    document.title = msg
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const { product, resetProduct } = useProduct()
  const { productId } = useParams()
  const { state } = useLocation() as StateTypeForLocationOrder
  const { addOrder } = useOrder()
  const [orderName, setOrderName] = useState(faker.name.firstName())
  const { removeAllInCart, removeProductInCart, productsInCart } = useCart()
  const [defaultPayMethodIndex] = useState(getRandomIntInclusive(0, 5))
  const [payMethodName, setPayMethodName] = useState(SamplesPayMethods[defaultPayMethodIndex])
  const [orderNumber] = useState(faker.datatype.uuid())
  const [products, setProducts] = useState([] as ProductForType[])
  useEffect(() => {
    console.log(`state.myState.from: ${state.myState.from}`)
    if (state.myState.from === 'cart') {
      if (productId) {
        setProducts(productsInCart.filter((product) => product.productId === productId))
      } else {
        setProducts(productsInCart)
      }
    } else if (state.myState.from === 'detail') {
      setProducts([product])
    }
    return () => resetProduct()
  }, [])

  const handlePay = () => {
    console.log(`in handlePay::state.myState.from: ${state.myState.from}`)
    if (state.myState.from === 'cart') {
      if (productId) {
        const willRemoveProduct = products.find((product) => product.productId === productId)
        willRemoveProduct && removeProductInCart(willRemoveProduct)
      } else {
        removeAllInCart()
      }
    }
    addOrder({
      ordererName: orderName,
      orderState: 'MakeOrder',
      orderNumber: orderNumber,
      payMethodName: payMethodName,
      makeDate: new Date(),
      products: products
    })

    ACSDK({
      type: ACParams.TYPE.BUY_DONE,
      msg: `${title}_BUY_DONE`,
      randomValue: randomValueForScreen,
      buy: {
        orderNumber: orderNumber,
        payMethodName: payMethodName,
        products: products
      }
    })
  }

  const handleSelectedPayMethod = (payMethod: string) => {
    console.log(`before payMethodName: ${payMethodName}, payMethod: ${payMethod}`)
    setPayMethodName(payMethod)
    console.log(`after payMethodName: ${payMethodName}`)
  }

  return (
    <div>
      <div style={{ width: '80%', border: '3px solid #eee' }}>
        {products.length < 1 ? (
          <p>카트가 비었습니다.</p>
        ) : (
          products.map((product, index) => <Product key={index} index={index} product={product} />)
        )}
      </div>
      <h2>결제 정보</h2>
      <div style={{ width: '80%', border: '3px solid #eee', display: 'flex', padding: 10 }}>
        <div style={{ marginLeft: '20px' }}>
          전체 주문 가격:{' '}
          {products
            .reduce((preValue, product) => (product.totalPrice ?? 0) + preValue, 0)
            .toLocaleString(navigator.language, {
              minimumFractionDigits: 0
            })}{' '}
          원
        </div>
        <div style={{ marginLeft: '20px' }}>
          <CustomizedHook
            labelName="지불 방법 선택"
            defaultValueIndex={defaultPayMethodIndex}
            minWidth={200}
            samples={SamplesPayMethods}
            onSelectedOptions={handleSelectedPayMethod}
          />
        </div>
      </div>
      <h2>주문자 정보</h2>
      <div style={{ width: '80%', border: '3px solid #eee', display: 'flex', padding: 10 }}>
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
              A 결제
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
          {props.index + 1}. 제품명: {props.product.productName}
        </Typography>
      </Box>
      <Image sx={{ width: '30%' }} src={props.product.productImg} alt="" />
      <Box sx={{ width: '100%' }}>
        <Typography display="inline" variant="subtitle1" color="text.secondary">
          제품 단가:{' '}
          {Number(props.product.productPrice).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}{' '}
          원
        </Typography>

        <Typography display="inline" variant="subtitle1" color="text.secondary" sx={{ ml: 5 }}>
          수량:{' '}
          {Number(props.product.quantity).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}
        </Typography>
        {props.product.totalPrice && (
          <Typography display="inline" variant="subtitle1" color="text.secondary" sx={{ ml: 5 }}>
            수량x가격:{' '}
            {props.product.totalPrice.toLocaleString(navigator.language, {
              minimumFractionDigits: 0
            })}{' '}
            원
          </Typography>
        )}
        {props.product.optionCode && (
          <Typography display="inline" variant="subtitle1" color="text.secondary" sx={{ ml: 5 }}>
            옵션 코드명: {props.product.optionCode}
          </Typography>
        )}
      </Box>
    </div>
  )
}

export default MallMakeOrder
