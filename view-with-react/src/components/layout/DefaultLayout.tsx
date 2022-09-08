import React from 'react'
import Box from '@mui/material/Box'
import { Routes, Route } from 'react-router-dom'

import Header from './default/Header'
import SideBar from './default/SideBar'
import Content from './default/Content'
import Footer from './default/Footer'

import MainNav from '../navigator/MainNav'
import { MainFooter, MainSideBar, EtcFooter } from '../part'
import FactoryContentPanels from '../menu/FactoryContentPanels'

/**
 * 기본 데스크탑 웹페이지 layout
 * @returns JSX.Element
 */
export default function DefaultLayout() {
  return (
    <>
      <Header>
        <Routes>
          <Route index element={<MainNav />} />
          <Route path="/:mainMenu" element={<MainNav />} />
          <Route path="/:mainMenu/:subMenu" element={<MainNav />} />
          <Route path="/:mainMenu/:subMenu/:id" element={<MainNav />} />
        </Routes>
      </Header>
      <SideBar>
        <MainSideBar />
      </SideBar>
      <Content>
        <Routes>
          <Route index element={<FactoryContentPanels />} />
          <Route path="/:mainMenu" element={<FactoryContentPanels />} />
          <Route path="/:mainMenu/:subMenu" element={<FactoryContentPanels />} />
          <Route path="/:mainMenu/:subMenu/:id" element={<FactoryContentPanels />} />
        </Routes>
      </Content>
      <Footer>
        <Routes>
          <Route path="etc" element={<EtcFooter />} />
          <Route path="*" element={<MainFooter />} />
        </Routes>
      </Footer>
    </>
  )
}
