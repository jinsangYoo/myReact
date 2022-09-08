import React from 'react'
import { Routes, Route } from 'react-router'

import { EtcMain, EtcGrid } from '../../pages'

export default function FactoryContentPanelForEtc() {
  return (
    <div>
      <Routes>
        <Route path="grid" element={<EtcGrid />} />
        <Route path="main" element={<EtcMain />} />
        <Route path="/*" element={<EtcMain />} />
      </Routes>
    </div>
  )
}
