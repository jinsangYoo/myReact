import React, { useState, useReducer, useEffect, useCallback, useMemo, useLayoutEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {
  Button,
  Container,
  List,
  Paper,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material'

import { useOrder, OrderType, ACSDK } from '../hooks'
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
import { DeleteOutlined } from '@mui/icons-material'

const title = 'mall_주문목록'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function MallOrderList() {
  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    document.title = msg
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

  const { enqueueSnackbar } = useSnackbar()
  const { orders, removeOrder, removeAllInOrders } = useOrder()
  const handleRemoveOrder = (order: OrderType) => {
    removeOrder(order)
    ACSDK({
      type: ACParams.TYPE.BUY_CANCEL,
      msg: `${title}_BUY_CANCEL`,
      randomValue: randomValueForScreen,
      buy: {
        orderNumber: order.orderNumber,
        payMethodName: order.payMethodName,
        products: order.products
      }
    })
    enqueueSnackbar('주문 내역을 삭제 했습니다.', { variant: 'success' })
  }
  const handleRemoveAllInOrders = () => {
    removeAllInOrders()
    enqueueSnackbar('전체 주문 내역을 삭제 했습니다.', { variant: 'success' })
  }

  return (
    <>
      <h2>주문 내역</h2>
      <Container style={{ border: '1px solid #eee', padding: 5 }} fixed>
        {orders.length < 1 ? (
          <p>주문 내역이 없습니다.</p>
        ) : (
          <Container>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'right' }}>
              <Typography sx={{ mr: 2, color: 'red' }}>주문 수: {orders.length}</Typography>
              <IconButton aria-label="전체 삭제" onClick={() => handleRemoveAllInOrders()}>
                <DeleteOutlined />
              </IconButton>
            </Box>
            <List sx={{ width: '100%', bgcolor: '' }}>
              {orders.map((order, index) => (
                <>
                  <Order key={index} index={index} order={order} onPressRemoveOrder={handleRemoveOrder} />
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

function Order(props: { index: number; order: OrderType; onPressRemoveOrder: (order: OrderType) => void }) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        sx={{ display: 'block' }}
        primary={`${props.index + 1}. 주문자: ${props.order.ordererName}`}
        secondary={
          <>
            <Container
              sx={{ display: 'flex', p: 1, m: 1, alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography sx={{ display: 'inline' }} component="span" variant="body2">
                주문 상태: {props.order.orderState}
              </Typography>
              <Typography sx={{ display: 'inline' }} component="span" variant="body2">
                지불 방법: {props.order.payMethodName}
              </Typography>
              <Typography sx={{ display: 'inline' }} component="span" variant="body2">
                주문 가격:{' '}
                {props.order.products
                  .reduce((preValue, product) => (product.totalPrice ?? 0) + preValue, 0)
                  .toLocaleString(navigator.language, {
                    minimumFractionDigits: 0
                  })}{' '}
                원
              </Typography>
              <Typography sx={{ display: 'inline' }} component="span" variant="body2">
                주문 번호: {props.order.orderNumber}
              </Typography>
            </Container>

            <Paper>
              <List>
                {props.order.products.map((product, index) => {
                  return (
                    <>
                      <ListItem
                        style={{
                          display: 'flex',
                          flexWrap: 'nowrap',
                          justifyContent: 'space-between',
                          color: '#888'
                        }}
                        key={index}
                      >
                        <label style={{ flexGrow: 2 }}>
                          {index + 1}. {product.productName}
                        </label>
                        <label style={{ flexGrow: 1 }}>수량: {product.quantity}</label>
                        <label style={{ flexGrow: 1 }}>옵션: {product.optionCode ?? 'none'}</label>
                        <label>
                          {product.totalPrice?.toLocaleString(navigator.language, {
                            minimumFractionDigits: 0
                          })}{' '}
                          원
                        </label>
                      </ListItem>
                      <Divider />
                    </>
                  )
                })}
              </List>
            </Paper>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'right' }}>
              <Button variant="outlined" sx={{ mr: 1 }} onClick={() => props.onPressRemoveOrder(props.order)}>
                A 주문 제거 및 취소
              </Button>
            </Box>
          </>
        }
      />
    </ListItem>
  )
}
