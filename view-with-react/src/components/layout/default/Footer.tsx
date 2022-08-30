import * as React from 'react'

interface FooterProps {
  children: React.ReactNode
}

export default function Footer(props: FooterProps) {
  return (
    <>
      <p>Footer</p>
      {props.children}
    </>
  )
}
