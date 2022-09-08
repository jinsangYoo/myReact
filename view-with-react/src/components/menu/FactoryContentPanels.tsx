import React from 'react'
import { useParams } from 'react-router-dom'

import { useMenus } from '../../hooks'

import FactoryContentPanelForPersonal from './FactoryContentPanelForPersonal'
import FactoryContentPanelForMyReact from './FactoryContentPanelForMyReact'
import FactoryContentPanelForEtc from './FactoryContentPanelForEtc'
import FactoryContentPanelForMall from './FactoryContentPanelForMall'

export default function FactoryContentPanels() {
  const { getDefaultMainMenuId, getDefaultSubMenuId } = useMenus()
  var { mainMenu, subMenu } = useParams()
  if (!mainMenu) mainMenu = getDefaultMainMenuId()
  if (!subMenu) subMenu = getDefaultSubMenuId()

  switch (mainMenu) {
    case 'personal':
      return <FactoryContentPanelForPersonal id={subMenu} />
    case 'myReact':
      return <FactoryContentPanelForMyReact id={subMenu} />
    case 'mall':
      return <FactoryContentPanelForMall id={subMenu} />
    case 'etc':
      return <FactoryContentPanelForEtc id={subMenu} />
    default: {
      console.log(`mainMenu: ${mainMenu}`)
      return <p>not find content.</p>
    }
  }
}
