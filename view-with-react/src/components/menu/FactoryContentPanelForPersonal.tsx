import React from 'react'
import { Routes, Route } from 'react-router'

import { PersonalMain, PersonalCommunity, PersonalAbout } from '../../pages'

export default function FactoryContentPanelForPersonal() {
  return (
    <div>
      <Routes>
        <Route path="about" element={<PersonalAbout />} />
        <Route path="community" element={<PersonalCommunity />} />
        <Route path="main" element={<PersonalMain />} />
        <Route path="/*" element={<PersonalMain />} />
      </Routes>
    </div>
  )
}
