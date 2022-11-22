import React from 'react'
import { Routes, Route } from 'react-router'
import { useParams } from 'react-router-dom'

import { useMenus } from '../../hooks'

import FactoryContentPanelForPersonal from './FactoryContentPanelForPersonal'
import FactoryContentPanelForMyReact from './FactoryContentPanelForMyReact'
import FactoryContentPanelForEtc from './FactoryContentPanelForEtc'
import FactoryContentPanelForMall from './FactoryContentPanelForMall'
import FactoryContentPanelForMemeber from './FactoryContentPanelForMemeber'
import FactoryContentPanelForSearch from './FactoryContentPanelForSearch'

import { Paper } from '@mui/material'

export default function FactoryContentPanels() {
  const { getDefaultMainMenuId, getDefaultSubMenuId } = useMenus()
  var { mainMenu, subMenu } = useParams()
  if (!mainMenu) mainMenu = getDefaultMainMenuId()
  if (!subMenu) subMenu = getDefaultSubMenuId()

  return (
    <Paper style={{ margin: 10, padding: 10 }}>
      <Routes>
        <Route path="etc/*" element={<FactoryContentPanelForEtc />} />
        <Route path="search/*" element={<FactoryContentPanelForSearch />} />
        <Route path="member/*" element={<FactoryContentPanelForMemeber />} />
        <Route path="mall/*" element={<FactoryContentPanelForMall />} />
        <Route path="myReact/*" element={<FactoryContentPanelForMyReact />} />
        <Route path="personal/*" element={<FactoryContentPanelForPersonal />} />
        <Route path="*" element={<FactoryContentPanelForPersonal />} />
      </Routes>
    </Paper>
  )
}
