import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import { TabPanel } from '../tabs/TabPanel'
import { useMenus } from '../../hooks'
import FactoryLeftVerticalPanels from '../menu/FactoryLeftVerticalPanels'

export default function PersonalVerticalTabs() {
  const [menuIndex, setMenuIndex] = React.useState(0)
  const { menus, updateSelectMenuId } = useMenus()

  const handleMenuChange = (event: React.SyntheticEvent, newValue: number) => {
    setMenuIndex(newValue)
    updateSelectMenuId(newValue)
  }

  return (
    <>
      <Box sx={{ maxWidth: { xs: 320, sm: 480, lg: 1 }, bgcolor: 'background.paper' }}>
        <Tabs
          value={menuIndex}
          onChange={handleMenuChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="navigation top menus"
        >
          {menus.map((menu) => (
            <Tab key={menu.id} label={menu.name} />
          ))}
        </Tabs>
      </Box>
      {menus.map((menu, index) => (
        <TabPanel value={menuIndex} index={index}>
          {<FactoryLeftVerticalPanels id={menu.id} />}
        </TabPanel>
      ))}
    </>
  )
}
