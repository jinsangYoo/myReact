import React from 'react'

import { MyReactMain, MyReactOpenSourceLicense } from '../../pages'

interface FactoryContentPanelForMyReactProps {
  id: string
}

export default function FactoryContentPanelForMyReact({ id }: FactoryContentPanelForMyReactProps) {
  switch (id) {
    case 'main':
      return <MyReactMain />
    case 'openSourceLicense':
      return <MyReactOpenSourceLicense />
    default:
      return <p>not find content.</p>
  }
}
