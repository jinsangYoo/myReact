import React from 'react'
import { Routes, Route } from 'react-router'

import { IframeMain, FirstPage, SecondPage } from '../../pages'

export default function FactoryContentPanelForIframe() {
  return (
    <div>
      <Routes>
        <Route path="second" element={<SecondPage />} />
        <Route path="first" element={<FirstPage />} />
        <Route path="main" element={<IframeMain />} />
        <Route path="*" element={<IframeMain />} />
      </Routes>
    </div>
  )
}
