import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { useMenus, useWrapperRouteMatchForMenu } from '../../hooks'
import FactoryContentPanels from '../menu/FactoryContentPanels'

export default function FactoryLeftVerticalPanels() {
  const { menus } = useMenus()

  const mainMenuPath = useWrapperRouteMatchForMenu()
  console.log(`FactoryLeftVerticalPanels::mainMenuPath: >>${JSON.stringify(mainMenuPath, null, 2)}<<`)

  const mainMenu = menus.find((menu) => menu.path === mainMenuPath.pathname)
  const subMenus = mainMenu?.subMenu

  return (
    <>
      <div>
        {subMenus &&
          subMenus.map((menu, index) => (
            <Link key={index} to={menu.path}>
              {menu.name}
              {' | '}
            </Link>
          ))}
      </div>
      <div>
        {subMenus &&
          subMenus.map((menu, index) => (
            <FactoryContentPanels key={index} mainMenuPath={mainMenuPath.pathname} subMenuPath={menu.path} />
          ))}
      </div>
    </>
  )
}
