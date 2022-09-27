import * as React from 'react'

interface HeaderProps {
  children: React.ReactNode
}

/**
 * Header
 * @param props
 * @returns JSX.Element
 */
export default function Header(props: HeaderProps) {
  return <>{props.children}</>
}
