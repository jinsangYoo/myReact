import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import { TabPanel } from '../tabs/TabPanel'
import { useMenus } from '../../hooks'
import FactoryLeftVerticalPanels from '../menu/FactoryLeftVerticalPanels'

export default function AppLayout() {
  const [mainMenuIndex, setMainMenuIndex] = React.useState(0)
  const { menus, updateSelectMenuId } = useMenus()

  const handleMainMenuChange = (event: React.SyntheticEvent, newValue: number) => {
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
          {menus.map((menu) => (
            <Tab key={menu.id} label={menu.name} />
          ))}
        </Tabs>
      </Box>
      {menus.map((menu, index) => (
        <TabPanel value={mainMenuIndex} index={index} key={index}>
          {<FactoryLeftVerticalPanels id={menu.id} />}
        </TabPanel>
      ))}
    </Box>
  )
}
