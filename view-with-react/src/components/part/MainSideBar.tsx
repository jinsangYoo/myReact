import * as React from 'react'
import Box from '@mui/material/Box'
import { Routes, Route } from 'react-router-dom'
import EtcSideBar from './EtcSideBar'
import FactoryLeftVerticalPanels from '../navigator/FactoryLeftVerticalPanels'

export default function MainSideBar() {
  return (
    <Box
      sx={{
        height: '500vh',
        maxWidth: { xs: 320, sm: 480, lg: 1 },
        bgcolor: 'background.paper',
        display: 'inline'
      }}
    >
      <Routes>
        <Route path="etc" element={<EtcSideBar />} />
        <Route path="/:mainMenu/:subMenu/*" element={<FactoryLeftVerticalPanels />} />
        <Route path="/:mainMenu/*" element={<FactoryLeftVerticalPanels />} />
        <Route path="/*" element={<FactoryLeftVerticalPanels />} />
      </Routes>
    </Box>
  )
}
