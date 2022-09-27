import React, { useState, useContext, useEffect } from 'react'
import { menuData } from '../data'

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
  menu: [MenuProps]
}

export interface IMenu {
  menus: MenuPropsType
  addMenu: (id: string, name: string, path: string, subMenu: [SubMenuProps]) => void
  updateMenu: (path: string, value: MenuProps) => void
  removeMenu: (path: string) => void

  getDefaultMainMenuId: () => string
  getDefaultSubMenuId: () => string
}

const MenuContext = React.createContext({} as IMenu)
export const useMenus = () => useContext(MenuContext)

export function MenuProvider(props: any) {
  const [menus, setMenus] = useState(menuData.menu)

  const addMenu = (id: string, name: string, path: string, subMenu: [SubMenuProps]) =>
    setMenus([...menus, { id, name, path, subMenu }])
  const updateMenu = (id: string, value: MenuProps) =>
    setMenus(menus.map((menu) => (menu.id === id ? value : menu)))
  const removeMenu = (id: string) => setMenus(menus.filter((menu) => menu.id !== id))

  const getDefaultMainMenuId = () => menus[0].path
  const getDefaultSubMenuId = () => menus[0].subMenu[0].path

  return (
    <MenuContext.Provider
      value={{
        menus,
        addMenu,
        updateMenu,
        removeMenu,
        getDefaultMainMenuId,
        getDefaultSubMenuId
      }}
    >
      {props.children}
    </MenuContext.Provider>
  )
}
