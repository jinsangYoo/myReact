import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useMenus, useWrapperRouteMatchForMenu } from '../../hooks'

import { Link, useParams, Outlet } from 'react-router-dom'

/**
 * MainNav
 * @returns JSX.Element
 */
export default function MainNav() {
  const { menus } = useMenus()

  const mainMenuPath = useWrapperRouteMatchForMenu()
  console.log(`MainNav::mainMenuPath: >>${JSON.stringify(mainMenuPath, null, 2)}<<`)

  console.log(`MainNav::useParams(): >>${JSON.stringify(useParams(), null, 2)}<<`)

  const handleMainMenuChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log(`newValue: >>${newValue}<<`)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { xs: 320, sm: 480, lg: 1 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={mainMenuPath.pathname}
        onChange={handleMainMenuChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-labelledby="navigation top menus"
      >
        {menus.map((menu, index) => (
          <Tab key={index} label={menu.name} value={menu.path} to={menu.path} component={Link} />
        ))}
      </Tabs>
      <Outlet />
    </Box>
  )
}
