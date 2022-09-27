import React from 'react'
import { Routes, Route } from 'react-router'

import { MallMain, ProductDetailInMall, MallMakeOrder, MallOrderDone, MallOrderList } from './'

export default function MallInRouter() {
  return (
    <div>
      <Routes>
        <Route path="orderDone" element={<MallOrderDone />} />
        <Route path="makeorder/:productId" element={<MallMakeOrder />} />
        <Route path="makeorder" element={<MallMakeOrder />} />
        <Route path="detail" element={<ProductDetailInMall />} />
        <Route path="orderList" element={<MallOrderList />} />
        <Route path="main" element={<MallMain />} />
        <Route path="*" element={<MallMain />} />
      </Routes>
    </div>
  )
}
