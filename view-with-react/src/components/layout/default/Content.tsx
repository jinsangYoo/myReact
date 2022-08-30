import * as React from 'react'

interface ContentProps {
  children: React.ReactNode
}

export default function Content(props: ContentProps) {
  return <div>{props.children}</div>
}
