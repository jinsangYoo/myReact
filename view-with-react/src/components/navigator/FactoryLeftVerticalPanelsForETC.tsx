import React from 'react'
import { Button } from '@mui/material'
import { useParams, Link } from 'react-router-dom'

import { useMenus } from '../../hooks'

export default function FactoryLeftVerticalPanelsForETC() {
  const { menus, getDefaultSubMenuId } = useMenus()

  const mainMenu = 'etc'
  var { subMenu } = useParams()
  if (!subMenu) subMenu = getDefaultSubMenuId()

  console.log(`subMenu: ${subMenu}`)

  const mainMenuObj = menus.find((menu) => menu.id === mainMenu)
  const subMenus = mainMenuObj?.subMenu

  const handleMainMenuChange = (newValue: string) => {}

  return (
    <div>
      {subMenus &&
        subMenus.map((menu, index) => (
          <ul key={index} style={{ display: 'inline' }}>
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
