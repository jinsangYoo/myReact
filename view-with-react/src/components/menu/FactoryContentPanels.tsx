import React from 'react'

import { useMenus } from '../../hooks'

import FactoryContentPanelForPersonal from './FactoryContentPanelForPersonal'
import FactoryContentPanelForMyReact from './FactoryContentPanelForMyReact'
import FactoryContentPanelForEtc from './FactoryContentPanelForEtc'
import FactoryContentPanelForMall from './FactoryContentPanelForMall'

export default function FactoryContentPanels() {
  const { getSelectMainMenuId, getSelectSubMenuId } = useMenus()

  switch (getSelectMainMenuId()) {
    case 'personal':
      return <FactoryContentPanelForPersonal id={getSelectSubMenuId()} />
    case 'myReact':
      return <FactoryContentPanelForMyReact id={getSelectSubMenuId()} />
    case 'mall':
      return <FactoryContentPanelForMall id={getSelectSubMenuId()} />
    case 'etc':
      return <FactoryContentPanelForEtc id={getSelectSubMenuId()} />
    default: {
      console.log(`getSelectMainMenuId: ${getSelectMainMenuId()}`)
      return <p>not find content.</p>
    }
  }
}
