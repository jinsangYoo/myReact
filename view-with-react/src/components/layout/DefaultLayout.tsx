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
        </Routes>
      </Header>
      <SideBar>
        <MainSideBar />
      </SideBar>
      <Content>
        <Box
          sx={{
            height: 'auto',
            minHeight: '100%',
            bgcolor: 'background.paper',
            paddingBottom: '160px'
          }}
        >
          {<FactoryContentPanels />}
        </Box>
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
