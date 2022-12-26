import * as React from 'react'
import Box from '@mui/material/Box'
import { Routes, Route } from 'react-router-dom'
import FactoryLeftVerticalPanels from '../navigator/FactoryLeftVerticalPanels'
import FactoryLeftVerticalPanelsForETC from '../navigator/FactoryLeftVerticalPanelsForETC'

export default function MainSideBar() {
  return (
    <Box>
      <Routes>
        <Route path="/etc/:subMenu/*" element={<FactoryLeftVerticalPanelsForETC />} />
        <Route path="/:mainMenu/:subMenu/*" element={<FactoryLeftVerticalPanels />} />
        <Route path="/:mainMenu/*" element={<FactoryLeftVerticalPanels />} />
        <Route path="/*" element={<FactoryLeftVerticalPanels />} />
      </Routes>
    </Box>
  )
}
