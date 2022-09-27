import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useOrder, OrderType } from '../hooks'

export default function MallOrderList() {
  const { orders, removeOrder, removeAllInOrders } = useOrder()
  const handleRemoveOrder = (order: OrderType) => {
    console.log(`삭제 대상 order: ${JSON.stringify(order, null, 2)}`)
    removeOrder(order)
  }
  const handleRemoveAllInOrders = () => {
    removeAllInOrders()
  }

  return (
    <div>
      <h2>주문 내역</h2>
      <div style={{ width: '80%', border: '3px solid #eee', padding: 10 }}>
        {orders.length < 1 ? (
          <p>주문 내역이 없습니다.</p>
        ) : (
          <>
            <div>
              <Box
                sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'right' }}
              >
                <Typography sx={{ mr: 2, color: 'red' }}>주문 수: {orders.length}</Typography>
                <Button variant="outlined" sx={{ mr: 2 }} onClick={() => handleRemoveAllInOrders()}>
                  전체 삭제
                </Button>
              </Box>
              {orders.map((order, index) => (
                <Order key={index} index={index} order={order} onPressRemoveOrder={handleRemoveOrder} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Order(props: { index: number; order: OrderType; onPressRemoveOrder: (order: OrderType) => void }) {
  return (
    <div style={{ borderBottom: '1px', borderBottomColor: '#eee', borderBottomStyle: 'solid' }}>
      <div>
        <Box sx={{ display: 'flex', p: 1, m: 1, alignItems: 'center' }}>
          <Typography sx={{ color: 'magenta' }}>
            {props.index + 1}. 주문자: {props.order.ordererName}
          </Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography display="inline" variant="subtitle1" color="text.secondary">
            주문 상태: {props.order.orderState}
          </Typography>

          <Typography display="inline" variant="subtitle1" color="text.secondary" sx={{ ml: 5 }}>
            주문 번호: {props.order.orderNumber}
          </Typography>
        </Box>
      </div>
      <div>
        <Box sx={{ width: '100%' }}>
          <Typography display="inline" variant="subtitle1" color="text.secondary">
            지불 방법: {props.order.payMethodName}
          </Typography>

          <Typography display="inline" variant="subtitle1" color="text.secondary" sx={{ ml: 5 }}>
            주문 가격:{' '}
            {props.order.products
              .reduce((preValue, product) => (product.totalPrice ?? 0) + preValue, 0)
              .toLocaleString(navigator.language, {
                minimumFractionDigits: 0
              })}{' '}
            원
          </Typography>
        </Box>
      </div>
      <div>
        <Box sx={{ width: '100%' }}></Box>
      </div>
      <div>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'right' }}>
          <Button variant="outlined" sx={{ mr: 1 }} onClick={() => props.onPressRemoveOrder(props.order)}>
            주문 제거
          </Button>
        </Box>
      </div>
    </div>
  )
}
