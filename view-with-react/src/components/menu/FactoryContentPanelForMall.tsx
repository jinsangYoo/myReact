import React from 'react'
import { Routes, Route } from 'react-router'

import { MallMain, MallCart, MallOrder } from '../../pages'

export default function FactoryContentPanelForMall() {
  return (
    <div>
      <Routes>
        <Route path="order" element={<MallOrder />} />
        <Route path="cart" element={<MallCart />} />
        <Route path="main/*" element={<MallMain />} />
        <Route path="/*" element={<MallMain />} />
      </Routes>
    </div>
  )
}
