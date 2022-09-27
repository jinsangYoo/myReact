import * as React from 'react'

interface SideBarProps {
  children: React.ReactNode
}

export default function SideBar(props: SideBarProps) {
  return <div>{props.children}</div>
}
