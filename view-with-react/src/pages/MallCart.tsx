import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useCart, ProductForType, useProduct } from '../hooks'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

const Image = styled('img')({
  width: '100%',
  borderRadius: 10
})

export default function MallCart() {
  const { updateProduct } = useProduct()
  const { products, updateProductInCart, removeProduct } = useCart()
  const handleUpdateCart = (product: ProductForType) => {
    if (!product) return
    console.log(`handleUpdateCart::product: ${JSON.stringify(product, null, 2)}`)
  }
  const handleRemoveCart = (product: ProductForType) => {
    if (!product) return
    console.log(`handleRemoveCart::product: ${JSON.stringify(product, null, 2)}`)
    removeProduct(product)
  }
  const handleGoToProductDetail = (product: ProductForType) => {
    if (!product) return
    updateProduct(product)
  }
  const handleGoToOrder = (product: ProductForType) => {
    if (!product) return
    console.log(`handleRemoveCart::product: ${JSON.stringify(product, null, 2)}`)
    handleGoToOrders([product])
  }
  const handleGoToOrders = (products: ProductForType[]) => {
    if (products.length < 1) return
    console.log(`handleGoToOrder::products: ${products.map((product) => JSON.stringify(product, null, 2))}`)
  }

  return (
    <div style={{ width: '80%', border: '3px solid #eee' }}>
      {products.length < 1 ? (
        <p>카트가 비었습니다.</p>
      ) : (
        products.map((product, index) => (
          <Product
            key={index}
            index={index}
            product={product}
            onPressUpdateCart={handleUpdateCart}
            onPressRemoveCart={handleRemoveCart}
            onPressGoToProductDetailAddCart={handleGoToProductDetail}
            onPressGoToOrder={handleGoToOrder}
          />
        ))
      )}
    </div>
  )
}

function Product(props: {
  index: number
  product: ProductForType
  onPressUpdateCart: (p: ProductForType) => void
  onPressRemoveCart: (p: ProductForType) => void
  onPressGoToProductDetailAddCart: (p: ProductForType) => void
  onPressGoToOrder: (p: ProductForType) => void
}) {
  return (
    <div style={{ borderBottom: '1px', borderBottomColor: '#eee', borderBottomStyle: 'solid' }}>
      <Box sx={{ display: 'flex', p: 1, m: 1, alignItems: 'center' }}>
        <Typography>
          {props.index + 1}. 제품명: {props.product.productName}
        </Typography>
      </Box>
      <Link to={'/mall/detail'} onClick={() => props.onPressGoToProductDetailAddCart(props.product)}>
        <Image sx={{ width: '30%' }} src={props.product.productImg} alt="" />
      </Link>
      <Box sx={{ width: '100%' }}>
        <Link to={'/mall/detail'} onClick={() => props.onPressGoToProductDetailAddCart(props.product)}>
          <Typography gutterBottom variant="body2">
            제품 설명: {props.product.productDescription}
          </Typography>
        </Link>
        <Typography display="block" variant="caption" color="text.secondary">
          제품 가격:{' '}
          {Number(props.product.productPrice).toLocaleString(navigator.language, {
            minimumFractionDigits: 0
          })}{' '}
          원
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'right' }}>
        <Button variant="outlined" sx={{ mr: 1 }} onClick={() => props.onPressRemoveCart(props.product)}>
          장바구니 제거
        </Button>
        <Button variant="outlined" sx={{ mr: 2 }} onClick={() => props.onPressGoToOrder(props.product)}>
          주문
        </Button>
      </Box>
    </div>
  )
}
