import React from 'react'

import FactoryContentPanelForPersonal from './FactoryContentPanelForPersonal'
import FactoryContentPanelForMyReact from './FactoryContentPanelForMyReact'
import FactoryContentPanelForMall from './FactoryContentPanelForMall'
import FactoryContentPanelForEtc from './FactoryContentPanelForEtc'

interface FactoryContentPanelsProps {
  mainMenuId: string
  subMenuId: string
}

export default function FactoryContentPanels({ mainMenuId, subMenuId }: FactoryContentPanelsProps) {
  switch (mainMenuId) {
    case 'personal':
      return <FactoryContentPanelForPersonal id={subMenuId} />
    case 'myReact':
      return <FactoryContentPanelForMyReact id={subMenuId} />
    case 'mall':
      return <FactoryContentPanelForMall id={subMenuId} />
    case 'etc':
      return <FactoryContentPanelForEtc id={subMenuId} />
    default:
      return <p>not find content.</p>
  }
}
