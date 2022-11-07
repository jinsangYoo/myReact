import React, { useState, useReducer, useEffect, useCallback, useMemo, useLayoutEffect } from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

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

const title = 'mall_주문완료'
const randomValueForScreen = getRandomIntInclusive(0, 999).toString()
export default function MallOrderDone() {
  useLayoutEffect(() => {
    const msg = `>>${title}<< >>${randomValueForScreen}<<`
    document.title = msg
    const params = ACParams.init(ACParams.TYPE.EVENT, msg)
    sendCommonWithPromise(msg, params)
  }, [])

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
