import React from 'react'

import FactoryContentPanelForPersonal from './FactoryContentPanelForPersonal'
import FactoryContentPanelForMyReact from './FactoryContentPanelForMyReact'
import FactoryContentPanelForMall from './FactoryContentPanelForMall'
import FactoryContentPanelForEtc from './FactoryContentPanelForEtc'

interface FactoryContentPanelsProps {
  mainMenuPath: string
  subMenuPath: string
}

export default function FactoryContentPanels({ mainMenuPath, subMenuPath }: FactoryContentPanelsProps) {
  switch (mainMenuPath) {
    case 'personal':
      return <FactoryContentPanelForPersonal path={subMenuPath} />
    case 'myReact':
      return <FactoryContentPanelForMyReact path={subMenuPath} />
    case 'mall':
      return <FactoryContentPanelForMall path={subMenuPath} />
    case 'etc':
      return <FactoryContentPanelForEtc path={subMenuPath} />
    default: {
      console.log(`mainMenuPath: ${mainMenuPath}`)
      return <p>not find content.</p>
    }
  }
}
