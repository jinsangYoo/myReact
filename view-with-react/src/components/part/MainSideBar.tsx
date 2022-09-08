import * as React from 'react'
import Box from '@mui/material/Box'
import { Routes, Route } from 'react-router-dom'
import EtcSideBar from './EtcSideBar'
import FactoryLeftVerticalPanels from '../navigator/FactoryLeftVerticalPanels'

export default function MainSideBar() {
  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480, lg: 1 }, bgcolor: 'background.paper', float: 'left' }}>
      <Routes>
        <Route path="/" element={<FactoryLeftVerticalPanels />} />
        <Route path="/:mainMenu" element={<FactoryLeftVerticalPanels />} />
        <Route path="/:mainMenu/:subMenu" element={<FactoryLeftVerticalPanels />} />
        <Route path="/:mainMenu/:subMenu/:id" element={<FactoryLeftVerticalPanels />} />
        <Route path="etc" element={<EtcSideBar />} />
      </Routes>
    </Box>
  )
}
