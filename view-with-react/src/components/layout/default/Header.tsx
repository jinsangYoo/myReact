import * as React from 'react'

import { Routes, Route, Link, useLocation } from 'react-router-dom'

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
