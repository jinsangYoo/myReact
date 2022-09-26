import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

import {
  ProductForType,
  useProduct,
  useCart,
  CustomizedHook,
  useOrder,
  IStateToOrder,
  OrderType
} from '../hooks'

export default function MallOrderDone() {
  const handlePay = () => {
    // console.log(`handlePay::orderName: ${orderName}`)
    // console.log(`handleGoToOrder::productQuantity: ${productQuantity}`)
    // console.log(`handleGoToOrder::productOption: ${productOption}`)
    // console.log(`handleGoToOrder::product: ${JSON.stringify(product, null, 2)}`)
    // setProductInTempNewOrderWithCalculateTotalPrice({
    //   ...product,
    //   quantity: productQuantity,
    //   optionCode: productOption
    // })
  }

  return (
    <div>
      <h1>주문 완료</h1>
      <div style={{ marginLeft: '20px' }}>
        <Link to="/mall/orderList" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" sx={{ ml: 1 }} onClick={handlePay}>
            구매 내역으로 이동
          </Button>
        </Link>
      </div>
    </div>
  )
}
