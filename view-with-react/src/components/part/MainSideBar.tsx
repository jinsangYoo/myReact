import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import EtcSideBar from './EtcSideBar'
import FactoryLeftVerticalPanels from '../navigator/FactoryLeftVerticalPanels'

export default function MainSideBar() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FactoryLeftVerticalPanels />} />
        <Route path="/:mainMenu" element={<FactoryLeftVerticalPanels />} />
        <Route path="/:mainMenu/:subMenu" element={<FactoryLeftVerticalPanels />} />
        <Route path="etc" element={<EtcSideBar />} />
      </Routes>
    </>
  )
}
