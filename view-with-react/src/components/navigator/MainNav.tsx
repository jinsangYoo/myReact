import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useMenus } from '../../hooks'
import { useParams } from 'react-router-dom'

/**
 * MainNav
 * @returns JSX.Element
 */
export default function MainNav() {
  const { menus, getSelectMainMenuId, updateSelectMainMenuId, updateSelectSubMenuId } = useMenus()

  var { mainMenu } = useParams()
  if (!mainMenu) mainMenu = getSelectMainMenuId()

  const handleMainMenuChange = (event: React.SyntheticEvent, newValue: string) => {
    updateSelectMainMenuId(newValue)
    updateSelectSubMenuId('main')
  }

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
          <Tab key={index} label={menu.name} value={menu.path} />
        ))}
      </Tabs>
    </Box>
  )
}
