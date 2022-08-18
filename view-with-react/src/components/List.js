import React from 'react'

export const tahoe_peaks = [
  { name: 'Freel Peak', elevation: 10891 },
  { name: 'Monument Peak', elevation: 10067 },
  { name: 'Pyramid Peak', elevation: 9983 },
  { name: 'Mt. Tallac', elevation: 9735 }
]

export function List({ data = [], renderEmpty, renderItem }) {
  if (!data.length) return renderEmpty
  return <ul>{data.map(renderItem)}</ul>
}
