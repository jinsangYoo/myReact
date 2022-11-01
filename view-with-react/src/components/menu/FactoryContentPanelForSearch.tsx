import React from 'react'
import { Routes, Route } from 'react-router'

import { SearchMain } from '../../pages'

export default function FactoryContentPanelForSearch() {
  return (
    <div>
      <Routes>
        <Route path="main/*" element={<SearchMain />} />
        <Route path="*" element={<SearchMain />} />
      </Routes>
    </div>
  )
}
