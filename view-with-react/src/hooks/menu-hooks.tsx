import React, { useState, useContext, useEffect } from 'react'
import { menuData } from '../data'
import { useParams } from 'react-router-dom'

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

  getSelectMainMenuId: () => string
  updateSelectMainMenuId: (id: string) => void
  getSelectSubMenuId: () => string
  updateSelectSubMenuId: (id: string) => void
}

const MenuContext = React.createContext({} as IMenu)
export const useMenus = () => useContext(MenuContext)

export function MenuProvider(props: any) {
  const [menus, setMenus] = useState(menuData.menu)
  const [selectMainMenuId, setSelectMainMenuId] = useState(menus[0].path)
  const [selectSubMenuId, setSelectSubMenuId] = useState(menus[0].subMenu[0].path)

  var { mainMenu, subMenu } = useParams()
  if (mainMenu) setSelectMainMenuId(mainMenu)
  if (subMenu) setSelectSubMenuId(subMenu)

  const addMenu = (id: string, name: string, path: string, subMenu: [SubMenuProps]) =>
    setMenus([...menus, { id, name, path, subMenu }])
  const updateMenu = (id: string, value: MenuProps) =>
    setMenus(menus.map((menu) => (menu.id === id ? value : menu)))
  const removeMenu = (id: string) => setMenus(menus.filter((menu) => menu.id !== id))

  const getSelectMainMenuId = () => selectMainMenuId
  const updateSelectMainMenuId = (id: string) => setSelectMainMenuId(id)
  const getSelectSubMenuId = () => selectSubMenuId
  const updateSelectSubMenuId = (id: string) => setSelectSubMenuId(id)

  return (
    <MenuContext.Provider
      value={{
        menus,
        addMenu,
        updateMenu,
        removeMenu,
        getSelectMainMenuId,
        updateSelectMainMenuId,
        getSelectSubMenuId,
        updateSelectSubMenuId
      }}
    >
      {props.children}
    </MenuContext.Provider>
  )
}
