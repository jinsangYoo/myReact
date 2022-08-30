import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Routes, Route, Link, useLocation } from 'react-router-dom'

interface SideBarProps {
  children: React.ReactNode
}

export default function SideBar(props: SideBarProps) {
  return <div>{props.children}</div>
}
