import React from 'react'
import { Routes, Route } from 'react-router'

import { MallMain, MallInRouter, MallCart, MallOrder } from '../../pages'

export default function FactoryContentPanelForMall() {
  return (
    <div>
      <Routes>
        <Route path="order" element={<MallOrder />} />
        <Route path="cart" element={<MallCart />} />
        <Route path="main/*" element={<MallInRouter />} />
        <Route path="*" element={<MallInRouter />} />
      </Routes>
    </div>
  )
}
