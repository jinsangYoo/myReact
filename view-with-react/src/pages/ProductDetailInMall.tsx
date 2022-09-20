import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { ProductForType, useProduct, useCart, CustomizedHook } from '../hooks'
import { Button } from '@mui/material'

const Image = styled('img')({
  width: '100%',
  borderRadius: 10
})

export default function ProductDetailInMall() {
  const { product } = useProduct()
  const { addProduct, printProducts } = useCart()

  const handleAddCart = (product: ProductForType) => {
    if (!product) return
    console.log(`handleAddCart::product: ${JSON.stringify(product, null, 2)}`)
    addProduct(product)
    printProducts()
  }

  const handleGoToOrder = (product: ProductForType) => {
    if (!product) return
    console.log(`handleGoToOrder::product: ${JSON.stringify(product, null, 2)}`)
  }

  const handleSelectedOptions = (e: React.SyntheticEvent, value: string[]) => {
    console.log(value)
  }

  return (
    <>
      <Product product={product} onPressAddCart={handleAddCart} onPressGoToOrder={handleGoToOrder} />
    </>
  )
}

function Product(props: {
  product: ProductForType
  onPressAddCart: (p: ProductForType) => void
  onPressGoToOrder: (p: ProductForType) => void
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
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'right' }}>
          <CustomizedHook labelName="옵션 구성" />
          <Button variant="outlined" sx={{ mr: 1 }} onClick={() => props.onPressAddCart(props.product)}>
            장바구니 추가
          </Button>
          <Button variant="outlined" sx={{ mr: 2 }} onClick={() => props.onPressGoToOrder(props.product)}>
            구매
          </Button>
        </Box>
      </Box>
    </div>
  )
}
