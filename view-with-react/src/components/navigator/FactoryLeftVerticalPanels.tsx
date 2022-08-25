import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'

import { TabPanel } from '../tabs/TabPanel'
import { useMenus } from '../../hooks'
import FactoryContentPanels from '../menu/FactoryContentPanels'

interface FactoryLeftVerticalPanelsProps {
  id: string
  path: string
}

export default function FactoryLeftVerticalPanels({ id, path }: FactoryLeftVerticalPanelsProps) {
  const { menus, updateSelectSubMenuId } = useMenus()
  const [menuIndex, setMenuIndex] = React.useState('main')
  const subMenus = menus.find((menu) => menu.id === id)?.subMenu

  const handleMenuChange = (event: React.SyntheticEvent, newValue: string) => {
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
        {subMenus &&
          subMenus.map((menu, index) => (
            <Tab
              key={index}
              label={menu.name}
              value={menu.path}
              to={`${path}/${menu.path}`}
              component={Link}
            />
          ))}
      </Tabs>
      {subMenus &&
        subMenus.map((menu, index) => (
          <TabPanel value={menuIndex} index={menu.path} key={index}>
            {<FactoryContentPanels mainMenuPath={id} subMenuPath={menu.path} />}
          </TabPanel>
        ))}
    </Box>
  )
}
