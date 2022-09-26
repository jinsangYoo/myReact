import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link, useLocation } from 'react-router-dom'
import Autocomplete from '@mui/material/Autocomplete'

import { faker } from '@faker-js/faker'
import { getRandomIntInclusive } from '../utils'
import { ProductForType, useOrder, OrderType } from '../hooks'

export default function MallOrderList() {
  const { orders, removeOrder } = useOrder()
  const handleRemoveOrder = (order: OrderType) => {
    console.log(`삭제 대상 order: ${JSON.stringify(order, null, 2)}`)
    removeOrder(order)
  }

  return (
    <div>
      <h1>주문 내역</h1>
      <div style={{ width: '80%', border: '3px solid #eee' }}>
        {orders.length < 1 ? (
          <p>주문 내역이 없습니다.</p>
        ) : (
          orders.map((order, index) => (
            <Order key={index} index={index} order={order} onPressRemoveOrder={handleRemoveOrder} />
          ))
        )}
      </div>
    </div>
  )
}

function Order(props: { index: number; order: OrderType; onPressRemoveOrder: (order: OrderType) => void }) {
  return (
    <div style={{ borderBottom: '1px', borderBottomColor: '#eee', borderBottomStyle: 'solid' }}>
      <Box sx={{ display: 'flex', p: 1, m: 1, alignItems: 'center' }}>
        <Typography>
          {props.index + 1}. 주문자: {props.order.ordererName}
        </Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Typography display="inline" variant="subtitle1" color="text.secondary">
          주문 상태: {props.order.orderState}원
        </Typography>

        {
          <Typography display="inline" variant="subtitle1" color="text.secondary" sx={{ ml: 5 }}>
            주문 번호: {props.order.orderNumber}
          </Typography>
        }

        {/* {props.product.totalPrice && (
          <Typography display="inline" variant="subtitle1" color="text.secondary" sx={{ ml: 5 }}>
            전체 가격:{' '}
            {props.product.totalPrice.toLocaleString(navigator.language, {
              minimumFractionDigits: 0
            })}
          </Typography>
        )} */}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'right' }}>
        <Button variant="outlined" sx={{ mr: 1 }} onClick={() => props.onPressRemoveOrder(props.order)}>
          주문 제거
        </Button>
      </Box>
    </div>
  )
}
