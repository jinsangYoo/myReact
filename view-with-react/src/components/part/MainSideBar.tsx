import * as React from 'react'
import Box from '@mui/material/Box'
import { Routes, Route } from 'react-router-dom'
import EtcSideBar from './EtcSideBar'
import FactoryLeftVerticalPanels from '../navigator/FactoryLeftVerticalPanels'

export default function MainSideBar() {
  return (
    <Box>
      <Routes>
        <Route path="etc" element={<EtcSideBar />} />
        <Route path="/:mainMenu/:subMenu/*" element={<FactoryLeftVerticalPanels />} />
        <Route path="/:mainMenu/*" element={<FactoryLeftVerticalPanels />} />
        <Route path="/*" element={<FactoryLeftVerticalPanels />} />
      </Routes>
    </Box>
  )
}
