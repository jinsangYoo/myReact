import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useMenus } from '../../hooks'
import { Link, useParams } from 'react-router-dom'

/**
 * MainNav
 * @returns JSX.Element
 */
export default function MainNav() {
  const { menus, getDefaultMainMenuId, getDefaultSubMenuId } = useMenus()

  var { mainMenu, subMenu } = useParams()
  if (!mainMenu) mainMenu = getDefaultMainMenuId()
  if (!subMenu) subMenu = getDefaultSubMenuId()

  const handleMainMenuChange = (event: React.SyntheticEvent, newValue: string) => {}

  return (
    <Box sx={{ width: '100%', maxWidth: { xs: 320, sm: 480, lg: 1 }, bgcolor: 'background.paper' }}>
      <Tabs
        value={mainMenu}
        onChange={handleMainMenuChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-labelledby="navigation top menus"
      >
        {menus.map((menu, index) => (
          <Tab key={index} label={menu.name} value={menu.path} to={`/${menu.path}`} component={Link} />
        ))}
      </Tabs>
    </Box>
  )
}
