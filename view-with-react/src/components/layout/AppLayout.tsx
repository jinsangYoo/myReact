import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Link, useLocation } from 'react-router-dom'

import { TabPanel } from '../tabs/TabPanel'
import { useMenus, useRouteMatch } from '../../hooks'
import FactoryLeftVerticalPanels from '../navigator/FactoryLeftVerticalPanels'

/**
 * 모바일 웹페이지를 위한 layout
 * @returns JSX.Element
 */
export default function AppLayout() {
  const { menus } = useMenus()
  const [mainMenuPath, setMainMenuPath] = React.useState('personal')

  const { pathname } = useLocation()
  console.log(`pathname: ${pathname}`)

  const pathArrays: string[] = []
  menus.map((menu, index) => pathArrays.push(menu.path))
  console.log(`pathArrays: ${pathArrays.join(', ')}`)
  const routeMatch = useRouteMatch(pathArrays)
  console.log(`routeMatch: ${JSON.stringify(routeMatch, null, 2)}`)

  const handleMainMenuChange = (event: React.SyntheticEvent, newValue: string) => {
    setMainMenuPath(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ maxWidth: { xs: 320, sm: 480, lg: 1 }, bgcolor: 'background.paper' }}>
        <Tabs
          value={mainMenuPath}
          onChange={handleMainMenuChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-labelledby="navigation top menus"
        >
          {menus.map((menu, index) => (
            <Tab key={index} label={menu.name} value={menu.id} to={menu.path} component={Link} />
          ))}
        </Tabs>
      </Box>
      {menus.map((menu, index) => (
        <TabPanel value={mainMenuPath} index={menu.id} key={index}>
          {<FactoryLeftVerticalPanels />}
        </TabPanel>
      ))}
    </Box>
  )
}
