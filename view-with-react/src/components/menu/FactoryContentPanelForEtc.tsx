import React from 'react'
import { Routes, Route } from 'react-router'

import { EtcMain, EtcPush } from '../../pages'

export default function FactoryContentPanelForEtc() {
  return (
    <div>
      <Routes>
        <Route path="push" element={<EtcPush />} />
        <Route path="main" element={<EtcMain />} />
        <Route path="*" element={<EtcMain />} />
      </Routes>
    </div>
  )
}
