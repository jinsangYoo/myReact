import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'
import { useCart, ProductForType } from '../hooks'
import { Link } from 'react-router-dom'

const Image = styled('img')({
  width: '100%'
})

export default function MallCart() {
  const { products, updateProduct, removeProduct } = useCart()
  const handleUpdateCart = (product: ProductForType) => {
    if (!product) return
    console.log(`handleUpdateCart::product: ${JSON.stringify(product, null, 2)}`)
  }
  const handleRemoveCart = (product: ProductForType) => {
    if (!product) return
    console.log(`handleRemoveCart::product: ${JSON.stringify(product, null, 2)}`)
  }
  const handleGoToProductDetail = (product: ProductForType) => {
    if (!product) return
    console.log(`handleGoToProductDetail::product: ${JSON.stringify(product, null, 2)}`)
  }
  const handleGoToOrder = (products: ProductForType[]) => {
    if (products.length < 1) return
    console.log(`handleGoToOrder::products: ${products.map((product) => JSON.stringify(product, null, 2))}`)
  }

  return (
    <div>
      {products.length < 1 ? (
        <p>카트가 비었습니다.</p>
      ) : (
        products.map((product, index) => (
          <Product
            key={index}
            index={index}
            product={product}
            onPressAddCart={handleUpdateCart}
            onPressRemoveCart={handleRemoveCart}
            onPressGoToProductDetailAddCart={handleGoToProductDetail}
          />
        ))
      )}
    </div>
  )
}

function Product(props: {
  index: number
  product: ProductForType
  onPressAddCart: (p: ProductForType) => void
  onPressRemoveCart: (p: ProductForType) => void
  onPressGoToProductDetailAddCart: (p: ProductForType) => void
}) {
  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ margin: 1 }}>
          <Avatar src={props.product.sellerAvatar} />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography>
            {props.index + 1}. {props.product.productName}
          </Typography>
        </Box>
      </Box>
      <Link to={'/mall/detail'} onClick={() => props.onPressGoToProductDetailAddCart(props.product)}>
        <Image src={props.product.productImg} alt="" />
      </Link>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ pr: 2 }}>
          <Link to={'/mall/detail'} onClick={() => props.onPressGoToProductDetailAddCart(props.product)}>
            <Typography gutterBottom variant="body2">
              {props.product.productDescription}
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
      </Box>
    </div>
  )
}
