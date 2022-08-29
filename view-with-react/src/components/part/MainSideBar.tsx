import * as React from 'react'
import { Outlet } from 'react-router-dom'
import FactoryLeftVerticalPanels from '../navigator/FactoryLeftVerticalPanels'

export default function MainSideBar() {
  return (
    <>
      <FactoryLeftVerticalPanels />
      <Outlet />
    </>
  )
}
