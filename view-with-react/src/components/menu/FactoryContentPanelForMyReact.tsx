import React from 'react'

import { MyReactMain, MyReactOpenSourceLicense } from '../../pages'

interface FactoryContentPanelForMyReactProps {
  path: string
}

export default function FactoryContentPanelForMyReact({ path }: FactoryContentPanelForMyReactProps) {
  switch (path) {
    case 'main':
      return <MyReactMain />
    case 'openSourceLicense':
      return <MyReactOpenSourceLicense />
    default:
      return <p>not find content.</p>
  }
}
