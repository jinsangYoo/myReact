import React from 'react'
import { Routes, Route } from 'react-router'

import { MallMain, ProductDetailInMall, MallMakeOrder } from './'

export default function MallInRouter() {
  return (
    <div>
      <Routes>
        <Route path="makeorder" element={<MallMakeOrder />} />
        <Route path="detail" element={<ProductDetailInMall />} />
        <Route path="main" element={<MallMain />} />
        <Route path="*" element={<MallMain />} />
      </Routes>
    </div>
  )
}
