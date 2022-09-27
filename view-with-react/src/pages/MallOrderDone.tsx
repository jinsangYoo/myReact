import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function MallOrderDone() {
  const handlePay = () => {}

  return (
    <div>
      <h2>주문 완료</h2>
      <div style={{ marginLeft: '20px' }}>
        <Link to="/mall/orderList" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" sx={{ ml: 1 }} onClick={handlePay}>
            주문 목록으로 이동
          </Button>
        </Link>
      </div>
    </div>
  )
}
