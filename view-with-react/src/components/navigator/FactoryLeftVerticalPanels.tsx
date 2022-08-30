import React from 'react'
import { useParams, Outlet } from 'react-router-dom'

import { useMenus } from '../../hooks'

export default function FactoryLeftVerticalPanels() {
  const { menus, getSelectMainMenuId, getSelectSubMenuId, updateSelectSubMenuId } = useMenus()
  console.log(`FactoryLeftVerticalPanels::mainMenu: >>${getSelectMainMenuId()}<<`)
  console.log(`FactoryLeftVerticalPanels::subMenu: >>${getSelectSubMenuId()}<<`)

  var { mainMenu, subMenu } = useParams()
  console.log(`1. FactoryLeftVerticalPanels::mainMenu: >>${mainMenu}<<, subMenu: >>${subMenu}<<`)
  if (!mainMenu) mainMenu = getSelectMainMenuId()
  if (!subMenu) subMenu = getSelectSubMenuId()

  const mainMenuObj = menus.find((menu) => menu.id === mainMenu)
  const subMenus = mainMenuObj?.subMenu

  const handleMainMenuChange = (newValue: string) => {
    updateSelectSubMenuId(newValue)
  }

  return (
    <>
      <div>
        {subMenus &&
          subMenus.map((menu, index) => (
            <ul key={index}>
              <button onClick={() => handleMainMenuChange(menu.path)}>{menu.name}</button>
            </ul>
          ))}
      </div>
      <Outlet />
    </>
  )
}
