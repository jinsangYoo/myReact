import React from 'react'
import { Routes, Route } from 'react-router'

import { MemberLogin, MemberJoin, MemberLeave } from '../../pages'

export default function FactoryContentPanelForMemeber() {
  return (
    <div>
      <Routes>
        <Route path="leave" element={<MemberLeave />} />
        <Route path="join" element={<MemberJoin />} />
        <Route path="main/*" element={<MemberLogin />} />
        <Route path="*" element={<MemberLogin />} />
      </Routes>
    </div>
  )
}
