import React, { useState, useReducer, useEffect, useCallback, useLayoutEffect } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useCart, ProductForType, useProduct, IStateToOrder, ACSDK } from '../hooks'
import { Link } from 'react-router-dom'
import { Button, Container, List, Paper, ListItem, ListItemText, Divider } from '@mui/material'
import { VariantType, useSnackbar } from 'notistack'

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

const title = 'mall_장바구니'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function MallCart() {
  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    document.title = msg
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const { enqueueSnackbar } = useSnackbar()
  const { updateProduct } = useProduct()
  const { productsInCart, removeAllInCart, removeProduct, makeFakeProducts, addProducts } = useCart()
  const handleUpdateCart = (product: ProductForType) => {
    if (!product) return
  }
  const handleRemoveCart = (product: ProductForType) => {
    if (!product) return
    removeProduct(product)
    ACSDK({
      type: ACParams.TYPE.DELCART,
      msg: `${title}_DELCART`,
      randomValue: randomValueForScreen,
      cart: {
        products: [product]
      }
    })
    enqueueSnackbar('장바구니 제품을 제거 했습니다.', { variant: 'success' })
  }
  const handleGoToProductDetail = (product: ProductForType) => {
    if (!product) return
    updateProduct(product)
  }
  const handleGoToOrder = (product: ProductForType) => {
    handleGoToOrders([product])
  }
  const handleGoToOrders = (products: ProductForType[]) => {
    if (products.length < 1) return
  }
  const handleRemoveAllInCart = () => {
    removeAllInCart()
    handleClickVariant('전체 장바구니 제품을 제거 했습니다.', 'success')
  }
  const handleRandom5AddCart = () => {
    const _products = makeFakeProducts(5)
    addProducts(_products)
    ACSDK({
      type: ACParams.TYPE.ADDCART,
      msg: `${title}_ADDCART`,
      randomValue: randomValueForScreen,
      cart: {
        products: _products
      }
    })
  }
  const handleClickVariant = (message: string, variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant })
  }

  return (
    <>
      <h2>장바구니</h2>
      <Container style={{ border: '1px solid #eee', padding: 5 }} fixed>
        {productsInCart.length < 1 ? (
          <Container>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'right' }}>
              <Button variant="outlined" sx={{ mr: 2 }} onClick={() => handleRandom5AddCart()}>
                Random 제품x5 추가
              </Button>
            </Box>
            <p>장바구니가 비었습니다.</p>
          </Container>
        ) : (
          <Container>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'right' }}>
              <Typography sx={{ mr: 2, color: 'red' }}>제품 수: {productsInCart.length}</Typography>
              <Link
                to="/mall/makeorder"
                state={{ myState: { from: 'cart' } as IStateToOrder }}
                style={{ textDecoration: 'none' }}
              >
                <Button variant="outlined" sx={{ mr: 2 }} onClick={() => handleGoToOrders(productsInCart)}>
                  전체 주문
                </Button>
              </Link>
              <Button variant="outlined" sx={{ mr: 2 }} onClick={() => handleRandom5AddCart()}>
                Random 장바구니x5 추가
              </Button>
              <Button variant="outlined" sx={{ mr: 2 }} onClick={() => handleRemoveAllInCart()}>
                전체 삭제
              </Button>
            </Box>
            <List>
              {productsInCart.map((product, index) => (
                <>
                  <Paper>
                    <Product
                      key={index}
                      index={index}
                      product={product}
                      onPressUpdateCart={handleUpdateCart}
                      onPressRemoveCart={handleRemoveCart}
                      onPressGoToProductDetailAddCart={handleGoToProductDetail}
                      onPressGoToOrder={handleGoToOrder}
                    />
                  </Paper>
                  <Divider />
                </>
              ))}
            </List>
          </Container>
        )}
      </Container>
    </>
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
    <ListItem alignItems="flex-start">
      <ListItemText
        sx={{ display: 'block' }}
        primary={`${props.index + 1}. 제품명: ${props.product.productName}`}
        secondary={
          <>
            <Link to={'/mall/detail'} onClick={() => props.onPressGoToProductDetailAddCart(props.product)}>
              <Image sx={{ width: '50%', display: 'block' }} src={props.product.productImg} alt="" />
            </Link>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                <Typography display="inline" variant="subtitle1" color="text.secondary">
                  수량x가격:{' '}
                  {props.product.totalPrice.toLocaleString(navigator.language, {
                    minimumFractionDigits: 0
                  })}{' '}
                  원
                </Typography>
              )}
              <Typography display="inline" variant="subtitle1" color="text.secondary">
                옵션코드: {props.product.optionCode ?? 'none'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
              <Button
                variant="outlined"
                sx={{ mr: 1 }}
                onClick={() => props.onPressRemoveCart(props.product)}
              >
                장바구니 제거
              </Button>
              <Link
                {...{ to: `/mall/makeorder/${props.product.productId}` }}
                state={{ myState: { from: 'cart', prodcutId: props.product.productId } as IStateToOrder }}
                style={{ textDecoration: 'none' }}
              >
                <Button variant="outlined" onClick={() => props.onPressGoToOrder(props.product)}>
                  개별 주문
                </Button>
              </Link>
            </Box>
          </>
        }
      />
    </ListItem>
  )
}
