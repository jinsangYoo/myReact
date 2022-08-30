import React from 'react'

import { MallMain, MallCart, MallOrder } from '../../pages'

interface FactoryContentPanelForMallProps {
  id: string
}

export default function FactoryContentPanelForMall({ id }: FactoryContentPanelForMallProps) {
  switch (id) {
    case 'main':
      return <MallMain />
    case 'cart':
      return <MallCart />
    case 'order':
      return <MallOrder />
    default:
      return <p>not find Mall content.</p>
  }
}
