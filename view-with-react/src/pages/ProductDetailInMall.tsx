import React, { useState, useReducer, useEffect, useCallback, useMemo, useLayoutEffect } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import {
  ProductForType,
  useProduct,
  useCart,
  CustomizedHook,
  useOrder,
  IStateToOrder,
  useACSDKHelper
} from '../hooks'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

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

const Image = styled('img')({
  width: '100%',
  borderRadius: 10
})

export interface SampleType {
  title: string
  year: number
}

const title = 'mall_제품 노출'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
const ProductDetailInMall = () => {
  useEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    document.title = msg
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const { enqueueSnackbar } = useSnackbar()
  const _nav = useNavigate()
  const { product } = useProduct()
  console.log(`제품상세보기: ${JSON.stringify(product, null, 2)}`)
  useACSDKHelper({
    type: ACParams.TYPE.APPEAR_PRODUCT,
    msg: `${title}_APPEAR_PRODUCT`,
    randomValue: randomValueForScreen,
    product
  })

  const optionIndex = product.optionCode ? Number(product.optionCode) - 1 : getRandomIntInclusive(0, 29)
  const [productQuantity, setProductQuantity] = useState(
    product.quantity !== 0 ? product.quantity : getRandomIntInclusive(1, 20)
  )
  const [productOption, setProductOption] = useState('')
  const { addProductWithCalculateTotalPrice, addFakeProductInCart } = useCart()
  const { setProductInTempNewOrderWithCalculateTotalPrice } = useOrder()

  const handleRandom5AddCart = () => {
    addFakeProductInCart(5)
    enqueueSnackbar('장바구니에 추가 했습니다.', { variant: 'success' })
  }

  const handleAddCart = (product: ProductForType) => {
    if (!product) return
    addProductWithCalculateTotalPrice({ ...product, quantity: productQuantity, optionCode: productOption })
    enqueueSnackbar('장바구니에 추가 했습니다.', { variant: 'success' })
  }

  const handleGoToOrder = (product: ProductForType) => {
    if (!product) return
    setProductInTempNewOrderWithCalculateTotalPrice({
      ...product,
      quantity: productQuantity,
      optionCode: productOption
    })
  }

  const handleSelectedOptions = (code: string) => {
    console.log(`제품옵션: ${code}`)
    setProductOption(code)
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = isNaN(Number(e.currentTarget.value)) ? 1 : Number(e.currentTarget.value)
    console.log(`제품수량: ${value}`)
    setProductQuantity(value)
  }

  useEffect(() => {
    if (product.productId.length === 0) {
      _nav('/mall/main')
    }
  }, [])

  return (
    <>
      <Product
        product={product}
        defaultQuantity={productQuantity}
        defaultOptionIndex={optionIndex}
        onChangeQuantity={handleQuantityChange}
        onPressRandom5AddCart={handleRandom5AddCart}
        onPressAddCart={handleAddCart}
        onPressGoToOrder={handleGoToOrder}
        onSelectedOptions={handleSelectedOptions}
      />
    </>
  )
}

function Product(props: {
  product: ProductForType
  defaultQuantity: number
  defaultOptionIndex: number
  onChangeQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPressRandom5AddCart: () => void
  onPressAddCart: (p: ProductForType) => void
  onPressGoToOrder: (p: ProductForType) => void
  onSelectedOptions: (value: string) => void
}) {
  const samplesOptionCode = React.useMemo(
    () => [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30'
    ],
    []
  )

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          m: 1
        }}
      >
        <Typography gutterBottom variant="body2">
          제품명: {props.product.productName}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'center' }}>
          <Box sx={{ m: 1 }}>
            <Avatar src={props.product.sellerAvatar} />
          </Box>

          <Box sx={{ mr: 2 }}>
            판매자: <Typography>{props.product.sellerName}</Typography>
          </Box>
        </Box>
      </Box>
      <Image src={props.product.productImg} alt="" />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ pr: 2 }}>
          <Typography gutterBottom variant="body2">
            제품 카테고리: {props.product.productCategory}
          </Typography>
          <Typography gutterBottom variant="body2">
            제품 ID: {props.product.productId}
          </Typography>
          <Typography gutterBottom variant="body2">
            상세정보: {props.product.productDescription}
          </Typography>

          <Typography display="block" variant="caption" color="text.secondary">
            제품 단가:{' '}
            {Number(props.product.productPrice).toLocaleString(navigator.language, {
              minimumFractionDigits: 0
            })}{' '}
            원
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'right',
            alignItems: 'end'
          }}
        >
          <Box sx={{ mr: 1 }}>
            <TextField
              required
              id="outlined-required"
              label="수량"
              defaultValue={props.defaultQuantity}
              onChange={props.onChangeQuantity}
              size="small"
              inputProps={{ inputMode: 'numeric' }}
            />
          </Box>
          <Box sx={{ mr: 1 }}>
            <CustomizedHook
              labelName="옵션 선택"
              defaultValueIndex={props.defaultOptionIndex}
              samples={samplesOptionCode}
              onSelectedOptions={props.onSelectedOptions}
            />
          </Box>
          <Button variant="outlined" sx={{ mr: 1 }} onClick={() => props.onPressRandom5AddCart()}>
            Random 장바구니x5 추가
          </Button>
          <Button variant="outlined" sx={{ mr: 1 }} onClick={() => props.onPressAddCart(props.product)}>
            장바구니 추가
          </Button>
          <Link
            to="/mall/makeorder"
            state={{ myState: { from: 'detail' } as IStateToOrder }}
            style={{ textDecoration: 'none' }}
          >
            <Button variant="outlined" sx={{ mr: 2 }} onClick={() => props.onPressGoToOrder(props.product)}>
              주문서 작성
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  )
}

export default ProductDetailInMall
