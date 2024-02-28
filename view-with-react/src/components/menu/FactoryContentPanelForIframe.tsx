import React from 'react'
import { Routes, Route } from 'react-router'

import {
  IframeMain,
  FirstPage,
  SecondPage,
  ThirdPage,
  FourthPage,
  IframeDouble,
  IframeCustomPortal
} from '../../pages'

export default function FactoryContentPanelForIframe() {
  return (
    <div>
      <Routes>
        <Route path="customIframePortal" element={<IframeCustomPortal />} />
        <Route path="double" element={<IframeDouble />} />
        <Route path="fourth" element={<FourthPage />} />
        <Route path="third" element={<ThirdPage />} />
        <Route path="second" element={<SecondPage />} />
        <Route path="first" element={<FirstPage />} />
        <Route path="main" element={<IframeMain />} />
        <Route path="*" element={<IframeMain />} />
      </Routes>
    </div>
  )
}
