import * as React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './default/Header'
import SideBar from './default/SideBar'
import Footer from './default/Footer'

import MainNav from '../navigator/MainNav'
import { MainFooter, MainSideBar, EtcFooter } from '../part'

/**
 * 기본 데스크탑 웹페이지 layout
 * @returns JSX.Element
 */
export default function DefaultLayout() {
  return (
    <>
      <Header>
        <Routes>
          <Route path="*" element={<MainNav />} />
        </Routes>
      </Header>
      <SideBar>
        <Routes>
          <Route path="*" element={<MainSideBar />} />
        </Routes>
      </SideBar>
      <Footer>
        <Routes>
          <Route path="etc" element={<EtcFooter />} />
          <Route path="*" element={<MainFooter />} />
        </Routes>
      </Footer>
    </>
  )
}
