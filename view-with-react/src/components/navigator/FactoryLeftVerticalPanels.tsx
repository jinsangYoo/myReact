import React from 'react'
import { Button } from '@mui/material'
import { useParams, Link } from 'react-router-dom'

import { useMenus } from '../../hooks'

export default function FactoryLeftVerticalPanels() {
  const { menus, getDefaultMainMenuId, getDefaultSubMenuId } = useMenus()

  var { mainMenu, subMenu } = useParams()
  if (!mainMenu) mainMenu = getDefaultMainMenuId()
  if (!subMenu) subMenu = getDefaultSubMenuId()

  const mainMenuObj = menus.find((menu) => menu.id === mainMenu)
  const subMenus = mainMenuObj?.subMenu

  const handleMainMenuChange = (newValue: string) => {}

  return (
    <div>
      {subMenus &&
        subMenus.map((menu, index) => (
          <ul key={index}>
            <Button
              variant="outlined"
              onClick={() => handleMainMenuChange(menu.path)}
              component={Link}
              to={`/${mainMenu}/${menu.path}`}
            >
              {menu.name}
            </Button>
          </ul>
        ))}
    </div>
  )
}
