import React from 'react'
import { Routes, Route } from 'react-router'

import { MallMain, MallInRouter, MallCart, MallOrders } from '../../pages'

export default function FactoryContentPanelForMall() {
  return (
    <div>
      <Routes>
        <Route path="order" element={<MallOrders />} />
        <Route path="cart" element={<MallCart />} />
        <Route path="main/*" element={<MallInRouter />} />
        <Route path="*" element={<MallInRouter />} />
      </Routes>
    </div>
  )
}
