import React from 'react'
import { useColors } from '../hooks'
import Color from './Color'

export default function ColorList() {
  const { colors } = useColors()
  if (!colors.length) {
    console.log(`colors.length: ${colors.length}`)
    return <div>표시할 색이 없습니다.</div>
  }

  return (
    <div>
      {colors.map((color) => (
        <Color key={color.id} {...color} />
      ))}
    </div>
  )
}
