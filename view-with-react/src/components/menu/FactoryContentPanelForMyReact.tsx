import React from 'react'
import { Routes, Route } from 'react-router'

import { MyReactMain, MyReactOpenSourceLicense } from '../../pages'

export default function FactoryContentPanelForMyReact() {
  return (
    <div>
      <Routes>
        <Route path="openSourceLicense" element={<MyReactOpenSourceLicense />} />
        <Route path="main" element={<MyReactMain />} />
        <Route path="*" element={<MyReactMain />} />
      </Routes>
    </div>
  )
}
