import React, { useState, useContext } from 'react'
import { menuData } from '../data'
import useRouteMatch from './useRouteMatch'

export interface SubMenuProps {
  name: string
  path: string
}

export interface MenuProps {
  name: string
  path: string
  subMenu: SubMenuProps[]
}

type MenuPropsType = MenuProps[]

interface MenuFormat {
  version: string
  lastSelectMenuPath: string
  lastSelectSubMenuPath: string
  menu: [MenuProps]
}

export interface IMenu {
  menus: MenuPropsType
  addMenu: (name: string, path: string, subMenu: [SubMenuProps]) => void
  updateMenu: (path: string, value: MenuProps) => void
  removeMenu: (path: string) => void
}

const MenuContext = React.createContext({} as IMenu)
export const useMenus = () => useContext(MenuContext)

export function MenuProvider(props: any) {
  const [menus, setMenus] = useState(menuData.menu)

  const addMenu = (name: string, path: string, subMenu: [SubMenuProps]) =>
    setMenus([...menus, { name, path, subMenu }])
  const updateMenu = (path: string, value: MenuProps) =>
    setMenus(menus.map((menu) => (menu.path === path ? value : menu)))
  const removeMenu = (path: string) => setMenus(menus.filter((menu) => menu.path !== path))

  return (
    <MenuContext.Provider
      value={{
        menus,
        addMenu,
        updateMenu,
        removeMenu
      }}
    >
      {props.children}
    </MenuContext.Provider>
  )
}

export const useWrapperRouteMatchForMenu = () => {
  const { menus } = useMenus()

  const pathArrays: string[] = []
  menus.map((menu) => pathArrays.push(`${menu.path}/:subPath`))

  const routeMatch = useRouteMatch(pathArrays, pathArrays[0])
  return (
    routeMatch || {
      params: {},
      pathname: pathArrays[0],
      pathnameBase: pathArrays[0],
      pattern: { path: pathArrays[0], caseSensitive: false, end: true }
    }
  )
}
