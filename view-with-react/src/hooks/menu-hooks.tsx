import React, { useState, useContext } from 'react'
import { menuData } from '../data'
import { v4 } from 'uuid'

export interface SubMenuProps {
  id: string
  name: string
  path: string
}

export interface MenuProps {
  id: string
  name: string
  path: string
  subMenu: SubMenuProps[]
}

type MenuPropsType = MenuProps[]

interface MenuFormat {
  version: string
  lastSelectMenuId: string
  lastSelectSubMenuId: string
  menu: [MenuProps]
}

export interface IMenu {
  menus: MenuPropsType
  addMenu: (name: string, path: string, subMenu: [SubMenuProps]) => void
  updateMenu: (id: string, value: MenuProps) => void
  removeMenu: (id: string) => void
  getSelectMenuId: () => string
  updateSelectMenuId: (index: string) => void
  getSelectSubMenuId: () => string
  updateSelectSubMenuId: (index: string) => void
}

const MenuContext = React.createContext({} as IMenu)
export const useMenus = () => useContext(MenuContext)

export function MenuProvider(props: any) {
  const [menus, setMenus] = useState(menuData.menu)
  const [lastSelectMenuId, setLastSelectMenuId] = useState(menuData.lastSelectMenuId)
  const [lastSelectSubMenuId, setLastSelectSubMenuId] = useState(menuData.lastSelectSubMenuId)

  const addMenu = (name: string, path: string, subMenu: [SubMenuProps]) =>
    setMenus([...menus, { id: v4(), name, path, subMenu }])
  const updateMenu = (id: string, value: MenuProps) =>
    setMenus(menus.map((menu) => (menu.id === id ? value : menu)))
  const removeMenu = (id: string) => setMenus(menus.filter((menu) => menu.id !== id))

  const getSelectMenuId = () => lastSelectMenuId
  const updateSelectMenuId = (index: string) => setLastSelectMenuId(index)
  const getSelectSubMenuId = () => lastSelectSubMenuId
  const updateSelectSubMenuId = (index: string) => setLastSelectSubMenuId(index)

  return (
    <MenuContext.Provider
      value={{
        menus,
        addMenu,
        updateMenu,
        removeMenu,
        getSelectMenuId,
        updateSelectMenuId,
        getSelectSubMenuId,
        updateSelectSubMenuId
      }}
    >
      {props.children}
    </MenuContext.Provider>
  )
}
