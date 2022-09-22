import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { ProductForType, useProduct, useCart, CustomizedHook, useOrder } from '../hooks'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import { getRandomIntInclusive } from '../utils'
import { Link } from 'react-router-dom'

const Image = styled('img')({
  width: '100%',
  borderRadius: 10
})

export interface SampleType {
  title: string
  year: number
}

export default function ProductDetailInMall() {
  const { product } = useProduct()
  const optionIndex = product.optionCode ? Number(product.optionCode) - 1 : getRandomIntInclusive(1, 30)
  const [productQuantity, setProductQuantity] = useState(
    product.quantity !== 0 ? product.quantity : getRandomIntInclusive(1, 10)
  )
  const [productOption, setProductOption] = useState('')
  const { addProductWithCalculateTotalPrice, printProducts } = useCart()
  const { setProductInTempOrderWithCalculateTotalPrice } = useOrder()

  const handleAddCart = (product: ProductForType) => {
    if (!product) return
    console.log(`handleAddCart::product: ${JSON.stringify(product, null, 2)}`)
    addProductWithCalculateTotalPrice({ ...product, quantity: productQuantity, optionCode: productOption })
    printProducts()
  }

  const handleGoToOrder = (product: ProductForType) => {
    if (!product) return
    console.log(`handleGoToOrder::productQuantity: ${productQuantity}`)
    console.log(`handleGoToOrder::productOption: ${productOption}`)
    console.log(`handleGoToOrder::product: ${JSON.stringify(product, null, 2)}`)
    setProductInTempOrderWithCalculateTotalPrice({
      ...product,
      quantity: productQuantity,
      optionCode: productOption
    })
  }

  const handleSelectedOptions = (code: string) => {
    console.log(`code: ${code}`)
    setProductOption(code)
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = isNaN(Number(e.currentTarget.value)) ? 1 : Number(e.currentTarget.value)
    console.log(`e.currentTarget.value: ${value}`)
    setProductQuantity(value)
  }

  return (
    <>
      <Product
        product={product}
        defaultQuantity={productQuantity}
        defaultOptionIndex={optionIndex}
        onChangeQuantity={handleQuantityChange}
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
  onPressAddCart: (p: ProductForType) => void
  onPressGoToOrder: (p: ProductForType) => void
  onSelectedOptions: (value: string) => void
}) {
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right', alignItems: 'center' }}>
        <Box sx={{ m: 1 }}>
          <Avatar src={props.product.sellerAvatar} />
        </Box>

        <Box sx={{ mr: 2 }}>
          판매자: <Typography>{props.product.productName}</Typography>
        </Box>
      </Box>
      <Image src={props.product.productImg} alt="" />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ pr: 2 }}>
          <Typography gutterBottom variant="body2">
            제품 설명: {props.product.productDescription}
          </Typography>
          <Typography display="block" variant="caption" color="text.secondary">
            제품 가격:{' '}
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
              label="제품 수량"
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
              onSelectedOptions={props.onSelectedOptions}
            />
          </Box>
          <Button variant="outlined" sx={{ mr: 1 }} onClick={() => props.onPressAddCart(props.product)}>
            장바구니 추가
          </Button>
          <Link to="/mall/makeorder" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={() => props.onPressGoToOrder(props.product)}>
              주문서 작성
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  )
}
