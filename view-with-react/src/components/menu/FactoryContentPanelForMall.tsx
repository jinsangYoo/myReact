import React from 'react'

import { MallMain, MallCart, MallOrder } from '../../pages'

interface FactoryContentPanelForMallProps {
  path: string
}

export default function FactoryContentPanelForMall({ path }: FactoryContentPanelForMallProps) {
  switch (path) {
    case 'main':
      return <MallMain />
    case 'cart':
      return <MallCart />
    case 'order':
      return <MallOrder />
    default:
      return <p>not find content.</p>
  }
}
