import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import { TabPanel } from '../tabs/TabPanel'
import { useMenus } from '../../hooks'
import FactoryContentPanels from './FactoryContentPanels'

interface FactoryLeftVerticalPanelsProps {
  id: string
}

export default function FactoryLeftVerticalPanels({ id }: FactoryLeftVerticalPanelsProps) {
  const { menus, updateSelectSubMenuId } = useMenus()
  const [menuIndex, setMenuIndex] = React.useState(0)
  const subMenus = menus.find((menu) => menu.id === id)?.subMenu

  const handleMenuChange = (event: React.SyntheticEvent, newValue: number) => {
    setMenuIndex(newValue)
    updateSelectSubMenuId(newValue)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
        maxHeight: { xs: 120, sm: 480, lg: 1 }
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={menuIndex}
        onChange={handleMenuChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {subMenus && subMenus.map((menu) => <Tab key={menu.id} label={menu.name} />)}
      </Tabs>
      {subMenus &&
        subMenus.map((menu, index) => (
          <TabPanel value={menuIndex} index={index} key={index}>
            {<FactoryContentPanels mainMenuId={id} subMenuId={menu.id} />}
          </TabPanel>
        ))}
    </Box>
  )
}
