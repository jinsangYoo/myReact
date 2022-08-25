import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Link, useLocation } from 'react-router-dom'

import { TabPanel } from '../tabs/TabPanel'
import { useMenus, useRouteMatch } from '../../hooks'
import FactoryLeftVerticalPanels from '../navigator/FactoryLeftVerticalPanels'

export default function AppLayout() {
  const { menus, updateSelectMenuId } = useMenus()
  const [mainMenuIndex, setMainMenuIndex] = React.useState('personal')

  const { pathname } = useLocation()
  console.log(`pathname: ${pathname}`)

  const pathArrays: string[] = []
  menus.map((menu, index) => (pathArrays[index] = menu.path))
  console.log(`pathArrays: ${pathArrays.join(', ')}`)
  const routeMatch = useRouteMatch(pathArrays)
  console.log(`routeMatch: ${JSON.stringify(routeMatch, null, 2)}`)

  const handleMainMenuChange = (event: React.SyntheticEvent, newValue: string) => {
    setMainMenuIndex(newValue)
    updateSelectMenuId(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ maxWidth: { xs: 320, sm: 480, lg: 1 }, bgcolor: 'background.paper' }}>
        <Tabs
          value={mainMenuIndex}
          onChange={handleMainMenuChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-labelledby="navigation top menus"
        >
          {menus.map((menu, index) => (
            <Tab key={index} label={menu.name} value={menu.path} to={menu.path} component={Link} />
          ))}
        </Tabs>
      </Box>
      {menus.map((menu, index) => (
        <TabPanel value={mainMenuIndex} index={menu.path} key={index}>
          {<FactoryLeftVerticalPanels id={menu.id} path={menu.path} />}
        </TabPanel>
      ))}
    </Box>
  )
}
