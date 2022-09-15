import React from 'react'
import { Routes, Route } from 'react-router'

import { MallMain, ProductDetailInMall } from './'

export default function MallInRouter() {
  return (
    <div>
      <Routes>
        <Route path="detail" element={<ProductDetailInMall />} />
        <Route path="main" element={<MallMain />} />
        <Route path="*" element={<MallMain />} />
      </Routes>
    </div>
  )
}
