import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'

import { ProductForType, useCart, useOrder } from '../hooks'

const Image = styled('img')({
  width: '100%',
  borderRadius: 10
})

export default function MallMakeOrder() {
  return <p>몰 주문서 작성 입니다.</p>
}
